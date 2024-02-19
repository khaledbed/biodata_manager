# insert_test_data.py

from api.models.project import Project
from api.models.sample import Sample
from api.models.method import Method
from api.models.reference import Reference
from api.models.annotation import Annotation

def insert_test_data():
    # Insert test projects
    project1 = Project("Project 1", "Description 1", ["Method 1", "Method 2"], ["Sample 1", "Sample 2"])
    project1.save()

    project2 = Project("Project 2", "Description 2", ["Method 3", "Method 4"], ["Sample 3", "Sample 4"])
    project2.save()

    # Insert test samples
    sample1 = Sample("Sample 1", "Genomic", {"key": "value"}, {"genomic_data": "data"})
    sample1.save()

    sample2 = Sample("Sample 2", "Transcriptomic", {"key": "value"}, {"transcriptomic_data": "data"})
    sample2.save()

    # Insert test methods
    method1 = Method("Method 1", "Description 1")
    method1.save()

    method2 = Method("Method 2", "Description 2")
    method2.save()

    # Insert test references
    reference1 = Reference("Title 1", "Author 1", "Journal 1", 2022)
    reference1.save()

    reference2 = Reference("Title 2", "Author 2", "Journal 2", 2023)
    reference2.save()

    # Insert test annotations
    annotation1 = Annotation("Content 1")
    annotation1.save()

    annotation2 = Annotation("Content 2")
    annotation2.save()

if __name__ == "__main__":
    insert_test_data()

