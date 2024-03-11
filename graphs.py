import sys
import matplotlib.pyplot as plt
import numpy as np
from scipy import stats

def chi_square(data):
    counts = np.unique(data, return_counts=True)[1]

    total_responses = len(data)
    unique_answers = len(set(data))
    expected_counts = np.array([total_responses / unique_answers] * unique_answers)

    observed = counts
    expected = expected_counts

    return stats.chi2_contingency(np.array([observed, expected]))

def preference():
    answers = ["Prototype A","Prototype B","Prototype A","Prototype B","Prototype B","Prototype B","Prototype C","Prototype B","Prototype B","Prototype A","Prototype C","Prototype C","Prototype B","Prototype A","Prototype C","Prototype A","Prototype A","Prototype A","Prototype C","Prototype B","Prototype B"]
    prototypes = ("Prototype A", "Prototype B", "Prototype C")
    counts = {
        'Actual': [answers.count(p) for p in prototypes],
        'Expected': (len(answers) / len(prototypes),) * len(prototypes)
    }

    chi_data = chi_square(answers)

    x = np.arange(len(prototypes))
    width = 0.25
    multiplier = 0

    fig, ax = plt.subplots(layout='constrained')

    for attribute, measurement in counts.items():
        offset = width * multiplier
        rects = ax.bar(x + offset, measurement, width, label=attribute)
        ax.bar_label(rects, padding=3)
        multiplier += 1

    ax.set_ylabel('Count')
    ax.set_xlabel(f"Chi-Square Value = {chi_data.statistic} | P-Value = {chi_data.pvalue}")
    ax.set_title('Prototype Preference')
    ax.set_xticks(x + width, prototypes)
    ax.legend(loc='upper left', ncols=3)
    ax.set_ylim(0, 10)

    plt.show()

def xlabel(arr):
    string = "Satisfaction Level\n"
    mean = "{:.2f}".format(np.mean(arr))
    standard_dev = "{:.2f}".format(np.std(arr))
    string += f"MEAN={mean} | MODE={stats.mode(arr).mode} | MEDIAN={np.median(arr)} | STANDARD DEVIATION={standard_dev}"
    return string

def satisfaction():
    satisfaction_A = [4,3,4,3,4,3,4,3,4,3,3,4,4,5,3,4,4,5,2,4,4]
    satisfaction_B = [4,5,3,4,5,4,4,5,5,2,4,2,5,4,2,3,4,4,2,5,5]
    satisfaction_C = [3,4,3,2,2,2,5,3,2,2,5,5,4,4,5,2,4,4,4,1,2]
    kruskal_data = stats.kruskal(satisfaction_A, satisfaction_B, satisfaction_C)
    print(kruskal_data)

    labels = ['Very Unsatisfied', 'Unsatisfied', 'Neutral', 'Satisfied', 'Very Satisfied']
    labels = ['1', '2', '3', '4', '5']
    counts_A = [satisfaction_A.count(i) for i in range(1, 6)]
    counts_B = [satisfaction_B.count(i) for i in range(1, 6)]
    counts_C = [satisfaction_C.count(i) for i in range(1, 6)]

    fig, ax = plt.subplots(layout='constrained')

    bar_width=0.8
    # Prototype A
    ax.bar(labels, counts_A, width=bar_width)
    ax.set_title('Prototype A Satisfaction')
    ax.set_xlabel(xlabel(satisfaction_A))
    ax.set_ylabel('Counts')
    for i, v in enumerate(counts_A):
        ax.text(i, v + 0.2, str(v), ha='center')
    plt.show()

    # Prototype B
    ax.bar(labels, counts_B, width=bar_width)
    ax.set_title('Prototype B Satisfaction')
    ax.set_xlabel(xlabel(satisfaction_B))
    ax.set_ylabel('Counts')
    for i, v in enumerate(counts_B):
        ax.text(i, v + 0.2, str(v), ha='center')
    plt.show()

    # Prototype C
    ax.bar(labels, counts_C, width=bar_width)
    ax.set_title('Prototype C Satisfaction')
    ax.set_xlabel(xlabel(satisfaction_C))
    ax.set_ylabel('Counts')
    for i, v in enumerate(counts_C):
        ax.text(i, v + 0.2, str(v), ha='center')
    plt.show()

def lightbulb():
    responses = [4, 1, 3, 3, 4, 4, 1, 2, 3, 2, 4, 2, 4]
    mean_response = np.mean(responses)
    median_response = np.median(responses)
    mode_response = np.argmax(np.bincount(responses))
    std_dev_response = np.std(responses)

    labels = ['Very Unsatisfied', 'Unsatisfied', 'Neutral', 'Satisfied', 'Very Satisfied']
    counts = [responses.count(i) for i in range(1, 6)]

    plt.figure(figsize=(8, 6))
    plt.bar(labels, counts)
    plt.xlabel(xlabel(responses))
    plt.ylabel('Counts')
    for i, v in enumerate(counts):
        plt.text(i, v + 0.2, str(v), ha='center')
    plt.title('Lightbulb Satisfaction')
    plt.xticks(labels)
    plt.show()

locals()[sys.argv[1]]()
