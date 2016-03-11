#Challenges 

## RNA Secondary Structure Prediction

Ribonucleic acids (RNAs) not only play a role in the Central Dogma of Molecular Biology as coding, messenger RNAs but also other roles in catalysis, genome maintenance, regulation, and protein synthesis as noncoding, functional RNAs. The function of noncoding RNAs highly depend on the 3D (tertiary) structure. Before the formation of the tertiary structure, secondary structure (canonical base paring of nucleotide sequences) is first formed independently; thus, it is critical to predict the secondary structure of RNAs first. 

As a visual representation of the secondary structure, the RNA sequence is laid out in a straight line, and the base pairings are represented by connecting arcs (See figure below). Typically, the arcs will be nested. i.e. they will not cross each other (top). However, in certain cases, the arcs do cross (bottom). This special topology is called a pseudoknot which adds significant time complexity to the structure prediction problem (NP hard). As a result, most of the existing prediction programs assume pseudoknot-free structure. However, pseudoknots are often observed in RNAs of functional significance such as ribosomal RNAs, transfer messenger RNAs, and viral RNAs. The current state-of-the-art pseudoknot structure prediction methods have insufficient accuracy. Thus, construct a computational strategy to better predict the pseudoknot-containing RNA secondary structure. 

### Useful Readings
* [RNA Structure Prediction: An Overview of Methods](https://drive.google.com/open?id=0B2ujBo4yLWjjdWdlX3pXcVJWX1E)
* [RNA Secondary Structure: Dynamic Programming Over Intervals](https://drive.google.com/open?id=0B2ujBo4yLWjjN2pSWlV1VkxjVkE)
* [IPknot: fast and accurate prediction of RNA secondary structures with pseudoknots using integer programming](https://drive.google.com/open?id=0B2ujBo4yLWjjcUZrdThNM3dBZnc)

### [List of RNA Structure Prediction Software](https://en.wikipedia.org/wiki/List_of_RNA_structure_prediction_software)

### Databases of RNA Sequences with Pseudoknots
* [RNA STRAND](http://www.rnasoft.ca/strand/)
* [PseudoBase](http://pseudobaseplusplus.utep.edu/)
