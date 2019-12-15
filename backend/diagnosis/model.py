import obonet
import networkx
from collections import Counter
# from sys import argv, exit

def get_questions(ontology_fn, phenotypes, n, diseases):
    model = Model(ontology_fn, phenotypes, diseases)
    return model.get_questions(n)


def get_jaccard(ontology_fn, phenotypes, diseases):
    model = Model(ontology_fn, phenotypes, diseases)
    return model.jaccard_index()

def get_probabilities(ontology_fn, phenotypes, diseases):
    model = Model(ontology_fn, phenotypes, diseases)
    return model.probabilities()

class Model:
    def __init__(self, ontology_fn, phenotypes, diseases):
        self.ontology = obonet.read_obo(ontology_fn)
        self.patient = Patient(self.ontology, phenotypes)
        self.diseases = [Disease(self.ontology, disease) for disease in diseases]

    def jaccard_index(self):
        return self.patient.jaccard_index(self.diseases)

    def probabilities(self):
        p = self.jaccard_index()
        p_sum = sum(p)
        return [i/p_sum for i in p]

    def get_questions(self, n):
        # Sort edges by number of disease ocurrences
        edges = Counter([edge for disease in self.diseases for edge in list(disease.graph.edges)])

        # Delete patient's edges
        for edge in self.patient.graph.edges:
            del edges[edge]

        # Get the 'n' questions
        edges = edges.most_common(int(n))
        nodes = set([edge[0][0] for edge in edges])

        # Get the names and de descriptions for the nodes
        result = [self.ontology.nodes[node] for node in nodes]

        return result


class PhenotypeGraph:
    def __init__(self, ontology, phenotypes):
        G = networkx.MultiDiGraph()
        root = 'HP:0000001'

        for phenotype in phenotypes:
            if phenotype not in ontology:
                continue

            paths = list(networkx.all_simple_paths(ontology, source=phenotype, target=root))
            for path in paths:
                g = ontology.subgraph(path)
                G = networkx.compose(G, g)
        G.add_nodes_from(ontology.nodes)
        self.graph = G


class Patient(PhenotypeGraph):
    def __init__(self, ontology, phenotypes):
        super().__init__(ontology, phenotypes)

    def jaccard_index(self, diseases):
        jaccard = []
        for disease in diseases:
            union = networkx.compose(self.graph, disease.graph)
            intersection = networkx.intersection(self.graph, disease.graph)
            jaccard.append(len(intersection.edges())/len(union.edges()))
        return jaccard


class Disease(PhenotypeGraph):
    def __init__(self, ontology, phenotypes):
        super().__init__(ontology, phenotypes)


# if __name__ == "__main__":
#     if len(argv) < 3:
#         exit('Not enough arguments')

#     ontology_fn = argv[1]
#     n = argv[2]
#     phenotypes = argv[3:]

#     questions = get_questions(None, ontology_fn, phenotypes, n)
#     print(questions)

#     jaccard = get_jaccard(None, ontology_fn, phenotypes)
#     print(jaccard)

#     probabilities = get_probabilities(None, ontology_fn, phenotypes)
#     print(probabilities)

#     phenotypes = phenotypes + questions
#     jaccard = get_jaccard(None, ontology_fn, phenotypes)
#     print(jaccard)

#     probabilities = get_probabilities(None, ontology_fn, phenotypes)
#     print(phenotypes)
