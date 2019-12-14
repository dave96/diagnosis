import React from 'react';
import { Step } from './Step.js';
import Autocomplete from 'react-autocomplete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from "react-router-dom";

function sortItems(a, b, value) {
    const aLower = a.label.toLowerCase()
    const bLower = b.label.toLowerCase()
    if(value === null)
        value = "";
    const valueLower = value.toLowerCase()
    const queryPosA = aLower.indexOf(valueLower)
    const queryPosB = bLower.indexOf(valueLower)
    if (queryPosA !== queryPosB) {
      return queryPosA - queryPosB
    }
    return aLower < bLower ? -1 : 1
}

function NextStep() {
    let history = useHistory();

    function handleClick() {
        history.push("/refine");
    }

    return (
        <button type="button" className="btn btn-primary" onClick={handleClick}>
        Next step
        </button>
    );
}

export class Describe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            selectedItems: [],
        };
    }

    matchesString(item, value) {
        if(value === null)
            value = "";

        return (
            this.state.selectedItems.indexOf(item.label) === -1 && (
            item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
            item.label.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        )
    }

    handleItemClick(item) {
        let index = this.state.selectedItems.indexOf(item);
        let itemsSpliced = [
            ...this.state.selectedItems.slice(0, index),
            ...this.state.selectedItems.slice(index+1)
          ];
        this.props.setPhenotypes(itemsSpliced.map(x => {return {label: x}}));
        this.setState({ selectedItems: itemsSpliced });
    }

    createItemList() {
        let items = [];
        let self = this;
        for(let i = 0; i < this.state.selectedItems.length; ++i) {
            const item = this.state.selectedItems[i];
            items.push(<li className="list-group-item" key={item}>{item}
                <span style={{ float: "right", cursor: "pointer" }} onClick={() => self.handleItemClick(item)}><FontAwesomeIcon icon={faTrash} /></span>
                </li>);
        }
        return items;
    }

    render() {
        return (
            <>
                <Step step="1"></Step>
                <div className="container mt-4">
                    <div className="row">
                        <div className="col">
                        <Autocomplete
                            wrapperStyle={{ position: 'relative', display: 'block' }}
                            inputProps= {{ className: "form-control form-control-lg", placeholder: "Describe your symptoms..." }}
                            getItemValue={(item) => item.label}
                            items={[
                                { label: 'Headache (HPO:XXXX)' },
                                { label: 'Tachycardia (HPO: XXXX)' },
                                { label: 'Anemia (HPO: XXXX)' }
                            ]}
                            renderMenu={children => (
                                <div className="dropdown-menu w-100 show">
                                  {children}
                                </div>
                              )}
                            sortItems={sortItems}
                            shouldItemRender={this.matchesString.bind(this)}
                            renderItem={(item, isHighlighted) =>
                                <div key={item.label} className={isHighlighted ? 'dropdown-item active' : 'dropdown-item'}>
                                {item.label}
                                </div>
                            }
                            value={this.state.value}
                            onChange={(e, value) => this.setState({ value }) }
                            onSelect={(value) => {
                                this.props.setPhenotypes([...this.state.selectedItems, value].map(x => {return {label: x}}));
                                this.setState({ value: "", selectedItems: [...this.state.selectedItems, value] });
                             } }
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <span className="pl-2 small">e.g.  &apos;headache&apos;, &apos;tachycardia&apos;, &apos;anemia&apos;, etc.</span>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                        <ul className="list-group list-group-flush">
                            {this.createItemList()}
                        </ul>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                        </div>
                        <div className="col-auto">
                            <NextStep />
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
