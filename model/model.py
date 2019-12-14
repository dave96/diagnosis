import obonet
import networkx
from collections import Counter
from sys import argv, exit

def get_questions(conn, ontology_fn, phenotypes, n):
    model = Model(conn, ontology_fn, phenotypes)
    return model.get_questions(n)


def get_jaccard(conn, ontology_fn, phenotypes):
    model = Model(conn, ontology_fn, phenotypes)
    return model.jaccard_index()

def get_probabilities(conn, ontology_fn, phenotypes):
    model = Model(conn, ontology_fn, phenotypes)
    return model.probabilities()

class Model:
    def __init__(self, conn, ontology_fn, phenotypes):
        self.ontology = obonet.read_obo(ontology_fn)
        self.patient = Patient(self.ontology, phenotypes)
        # TODO Get all diseases that contain the phenotypes
        # TODO Construct the diseases with all their associated phenotypes
        disease1 = Disease(self.ontology, ['HP:0000218', 'HP:0000238', 'HP:0000256'])
        disease2 = Disease(self.ontology, ['HP:0000218', 'HP:0000518', 'HP:0000541'])
        disease3 = Disease(self.ontology, ['HP:0000926', 'HP:0002815', 'HP:0002867'])
        self.diseases = [disease1, disease2, disease3]

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

        return list(nodes)


class PhenotypeGraph:
    def __init__(self, ontology, phenotypes):
        G = networkx.MultiDiGraph()
        root = 'HP:0000001'

        for phenotype in phenotypes:
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


if __name__ == "__main__":
    if len(argv) < 3:
        exit('Not enough arguments')

    ontology_fn = argv[1]
    n = argv[2]
    phenotypes = argv[3:]

    questions = get_questions(None, ontology_fn, phenotypes, n)
    print(questions)

    jaccard = get_jaccard(None, ontology_fn, phenotypes)
    print(jaccard)

    probabilities = get_probabilities(None, ontology_fn, phenotypes)
    print(probabilities)

    phenotypes = phenotypes + questions
    jaccard = get_jaccard(None, ontology_fn, phenotypes)
    print(jaccard)

    probabilities = get_probabilities(None, ontology_fn, phenotypes)
    print(phenotypes)