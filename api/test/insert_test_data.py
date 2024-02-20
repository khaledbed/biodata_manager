# insert_test_data.py
# insert_test_data.py

from api.models.project import Project
from api.models.sample import Sample
from api.models.method import Method
from api.models.reference import Reference
from api.models.annotation import Annotation

def insert_test_data():
    # Insert test projects
    project1 = Project("Genome Assembly Project", "This project aims to assemble the genome of a novel species", ["SPAdes", "ABySS"], ["Sample_A", "Sample_B"])
    project1.save()

    project2 = Project("RNA-Seq Analysis", "Investigating gene expression changes in response to stress", ["STAR", "HISAT2"], ["Sample_C", "Sample_D"])
    project2.save()

    # Insert test samples
    sample1 = Sample("Sample_A", "Genomic", {"tissue": "leaf"}, {"raw_reads": "data"})
    sample1.save()

    sample2 = Sample("Sample_B", "Genomic", {"tissue": "root"}, {"raw_reads": "data"})
    sample2.save()

    sample3 = Sample("Sample_C", "Transcriptomic", {"treatment": "control"}, {"raw_reads": "data"})
    sample3.save()

    sample4 = Sample("Sample_D", "Transcriptomic", {"treatment": "stress"}, {"raw_reads": "data"})
    sample4.save()

    # Insert test methods
    method1 = Method("SPAdes", "De novo genome assembly using SPAdes algorithm")
    method1.save()

    method2 = Method("ABySS", "Another de novo genome assembly method")
    method2.save()

    method3 = Method("STAR", "Aligning RNA-Seq reads using STAR")
    method3.save()

    method4 = Method("HISAT2", "Aligning RNA-Seq reads using HISAT2")
    method4.save()

    # Insert test references
    reference1 = Reference("SPAdes: A New Genome Assembly Algorithm and Its Applications to Single-Cell Sequencing", "Bankevich A et al.", "Journal of Computational Biology", 2012)
    reference1.save()

    reference2 = Reference("TopHat: discovering splice junctions with RNA-Seq", "Trapnell C et al.", "Bioinformatics", 2009)
    reference2.save()

    # Insert test annotations
    annotation1 = Annotation("Genome assembly was performed using SPAdes with default parameters.")
    annotation1.save()

    annotation2 = Annotation("Differential expression analysis was conducted using DESeq2.")
    annotation2.save()

if __name__ == "__main__":
    insert_test_data()

