const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const resources = [
    { 
        filename: 'engineering-maths-unit-1.pdf', 
        title: "Engineering Maths - Unit 1 Notes", 
        content: `
# Engineering Mathematics - Unit 1: Calculus

## 1.1 Limits and Continuity
- Definition of Limit
- Left-hand and Right-hand Limits
- Continuity at a point

## 1.2 Differentiation
- First Principles
- Chain Rule
- Product and Quotient Rules

## 1.3 Integration
- Indefinite Integrals
- Definite Integrals
- Area under curves

## Practice Problems
1. Find the limit of (sin x)/x as x approaches 0.
2. Differentiate y = x^2 * sin(x).
3. Integrate x^3 dx from 0 to 1.
        `
    },
    { 
        filename: 'physics-pyq-2023.pdf', 
        title: "Physics PYQ 2023", 
        content: `
# Physics Previous Year Question Paper (2023)

## Section A (Multiple Choice)
1. The unit of electric flux is:
   a) N/C
   b) V/m
   c) V-m
   d) N-m/C

2. Which of the following is not an electromagnetic wave?
   a) X-rays
   b) Gamma rays
   c) Beta rays
   d) Radio waves

## Section B (Theory)
3. State Gauss's Law in electrostatics.
4. Derive the expression for capacitance of a parallel plate capacitor.
5. Explain the phenomenon of interference of light.

## Section C (Numericals)
6. A convex lens of focal length 20cm is placed in contact with a concave lens of focal length 10cm. Find the power of the combination.
        `
    },
    { 
        filename: 'data-structures-trees-graphs.pdf', 
        title: "Data Structures - Trees & Graphs", 
        content: `
# Data Structures: Trees and Graphs

## Trees
- **Binary Tree**: A tree where each node has at most two children.
- **BST (Binary Search Tree)**: Left child < Parent < Right child.
- **AVL Tree**: Self-balancing BST.

### Traversal Methods
1. Inorder (Left, Root, Right)
2. Preorder (Root, Left, Right)
3. Postorder (Left, Right, Root)

## Graphs
- **Definition**: A collection of nodes (vertices) and edges.
- **Types**: Directed, Undirected, Weighted, Unweighted.

### Algorithms
- **BFS (Breadth-First Search)**: Uses Queue.
- **DFS (Depth-First Search)**: Uses Stack (or recursion).
- **Dijkstra's Algorithm**: Shortest path in weighted graph.
        `
    },
    { 
        filename: 'chemistry-lab-manual.pdf', 
        title: "Chemistry Lab Manual", 
        content: `
# Chemistry Laboratory Manual

## Experiment 1: Titration
**Objective**: To determine the strength of given HCl solution using standard NaOH solution.
**Apparatus**: Burette, Pipette, Conical Flask, Indicator (Phenolphthalein).
**Procedure**:
1. Rinse and fill the burette with NaOH.
2. Pipette out 20ml of HCl into conical flask.
3. Add 2 drops of indicator.
4. Titrate until pale pink color appears.

## Experiment 2: Salt Analysis
**Objective**: To identify the cation and anion in the given salt.
**Preliminary Tests**:
- Color
- Odour
- Solubility

## Safety Precautions
- Always wear lab coat and safety goggles.
- Handle acids with care.
        `
    },
    { 
        filename: 'basic-electronics-formula-sheet.pdf', 
        title: "Basic Electronics - Formula Sheet", 
        content: `
# Basic Electronics Formula Sheet

## Ohm's Law
V = I * R

## Power
P = V * I = I^2 * R = V^2 / R

## Diodes
- **Forward Bias**: Current flows easily.
- **Reverse Bias**: Minimal current flows.
- **Shockley Equation**: I = Is * (e^(V/nVt) - 1)

## Transistors (BJT)
- I_E = I_B + I_C
- Beta (Current Gain) = I_C / I_B
- Alpha = I_C / I_E

## Op-Amps
- **Inverting Amplifier**: V_out = -(Rf/Rin) * V_in
- **Non-Inverting Amplifier**: V_out = (1 + Rf/Rin) * V_in
        `
    },
    { 
        filename: 'thermodynamics-basics.pdf', 
        title: "Thermodynamics Basics", 
        content: `
# Thermodynamics Basics

## Laws of Thermodynamics
1. **Zeroth Law**: Thermal Equilibrium.
2. **First Law**: Conservation of Energy (dQ = dU + dW).
3. **Second Law**: Entropy always increases (Kelvin-Planck & Clausius statements).
4. **Third Law**: Entropy of a perfect crystal at absolute zero is zero.

## Key Concepts
- **System**: Open, Closed, Isolated.
- **Process**: Isothermal (T=const), Adiabatic (Q=0), Isobaric (P=const), Isochoric (V=const).
- **Enthalpy (H)**: H = U + PV.
- **Entropy (S)**: Measure of disorder.

## Carnot Cycle
- Two isothermal and two adiabatic processes.
- Efficiency = 1 - (T_cold / T_hot).
        `
    },
    { 
        filename: 'algorithms-assignment-1.pdf', 
        title: "Algorithms Assignment 1", 
        content: `
# Design and Analysis of Algorithms - Assignment 1

**Due Date**: 15th Oct 2025

## Questions

1. **Big-O Notation**:
   Prove that 3n^2 + 10n + 5 = O(n^2).

2. **Sorting**:
   Explain the working of Merge Sort with an example array: [12, 11, 13, 5, 6, 7].
   Analyze its time complexity.

3. **Recurrence Relations**:
   Solve the recurrence relation: T(n) = 2T(n/2) + n using Master Theorem.

4. **Dynamic Programming**:
   Write the algorithm for finding the nth Fibonacci number using DP (Memoization).

## Submission Guidelines
- Submit as a PDF file.
- Include your name and roll number.
        `
    }
];

const outputDir = path.join(__dirname, 'public', 'documents');

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

resources.forEach(res => {
    const doc = new PDFDocument();
    const filePath = path.join(outputDir, res.filename);
    
    doc.pipe(fs.createWriteStream(filePath));
    
    doc.fontSize(20).text(res.title, { align: 'center' });
    doc.moveDown();
    
    // Simple markdown-like parsing
    const lines = res.content.split('\n');
    lines.forEach(line => {
        line = line.trim();
        if (line.startsWith('# ')) {
            doc.fontSize(18).text(line.replace('# ', ''), { underline: true });
            doc.moveDown(0.5);
        } else if (line.startsWith('## ')) {
            doc.fontSize(16).text(line.replace('## ', ''));
            doc.moveDown(0.5);
        } else if (line.startsWith('### ')) {
            doc.fontSize(14).text(line.replace('### ', ''));
            doc.moveDown(0.5);
        } else if (line.startsWith('- ')) {
            doc.fontSize(12).text('• ' + line.replace('- ', ''), { indent: 20 });
        } else if (line.match(/^\d+\. /)) {
            doc.fontSize(12).text(line, { indent: 20 });
        } else {
            doc.fontSize(12).text(line);
        }
    });
    
    doc.end();
    console.log(`Generated ${res.filename}`);
});
