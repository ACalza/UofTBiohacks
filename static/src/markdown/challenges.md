#Challenges 

## 1. Phylogenetic Trees
Phylogenetic tree reconstruction is an attempt to discover the ancestral relationship between the members of a set of sequences. It involves the construction of a tree, where the nodes represent separate evolutionary paths, and the lengths of the branches give an estimate of how distantly related the sequences represented by those branches are.

Currently, there are several methods of constructing phylogenetic trees. Many common ones fall into categories such as distance methods, parsimony methods, and maximum likelihood methods; each type of method may give you different trees, and have different tradeoffs. For this challenge, your team will come up with a new method to construct a phylogenetic tree from the species found below. Your method will be evaluated by the judges. To start off with, you should begin by creating alignments. 

#####Species genomes
* [Escherichia coli](http://www.ncbi.nlm.nih.gov/genome/?term=Escherichia%20coli)
* [Yersinia pestis](http://www.ncbi.nlm.nih.gov/genome/?term=Yersinia+pestis)
* [Vibrio cholerae](http://www.ncbi.nlm.nih.gov/genome/?term=Vibrio+cholerae)
* [Haemophilus influenzae](http://www.ncbi.nlm.nih.gov/genome/?term=Haemophilus+influenzae)
* [Pseudomonas aeruginosa](http://www.ncbi.nlm.nih.gov/genome/?term=Pseudomonas+aeruginosa)
* [Salmonella typhimurium](http://www.ncbi.nlm.nih.gov/genome/?term=Salmonella+typhimurium)
* [Neisseria meningitidis](http://www.ncbi.nlm.nih.gov/genome/?term=Neisseria+meningitidis)
* [Helicobacter pylori](http://www.ncbi.nlm.nih.gov/genome/?term=Helicobacter+pylori)
* [Pasteurella multocida](http://www.ncbi.nlm.nih.gov/genome/?term=Pasteurella+multocida)
* [Ralstonia solanacearum](http://www.ncbi.nlm.nih.gov/genome/?term=Ralstonia+solanacearum)

## 2. Gene Annotation/Prediction
Gene annotation/prediction is a process where a function or family is predicted from reading a nucleotide or amino acid sequence. This process is one of the most important steps in studying the metabolism, phylogeny, and the overall genomic properties of a sequenced species. 

With the emergence of high throughput sequencing technologies, development of automated gene annotation methods has exploded, creating significantly more precise and efficient algorithms. Existing tools use a variety of approaches such as sequence alignment, artificial neural networks and statistical modeling to name a few. Your challenge is to develop a novel method for gene prediction, or construct a pipeline that uses a combination of existing approaches to improve gene annotation. 

#####Tools
* [BLAST](http://blast.ncbi.nlm.nih.gov/Blast.cgi)
* [Gene ontology](http://geneontology.org/)
* [HHpred](http://toolkit.tuebingen.mpg.de/hhpred)
* [Pfam](http://pfam.xfam.org/)
* [GLIMMER](http://www.cbcb.umd.edu/software/glimmer-mg/)

## 3. Mass Spectrum to Protein

Protein Mass spectrometry is application of mass spectrometry to proteins. Mass spectrometry is a technique that sorts ions according to their mass and gives exact chemical composition of a sample. Mass spectrum is a plot representing an intensity vs mass to charge ratio (m/z).  Peaks found on a protein mass spectrum can be used to identify aminoacid residues present. This challenge focusses on obtaining information (structure, chemical composition) of a protein by utilizing mass spectrum given by designing a computational tool. You can use following mass spectrum data from a to C to develop your tool and identify the given examples.

#### Lınks to the data sets:
- A: https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/PASS_View?identifier=PASS00096 (MS data is located under data_mzXML)
- B: https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/PASS_View?identifier=PASS00011 (MS data are the mzXML files, not the excel files)
- C: https://db.systemsbiology.net/sbeams/cgi/PeptideAtlas/PASS_View?identifier=PASS00091 (MS data in the mzXML_Part# folders)


## 4. RNA Secondary Structure Prediction

Ribonucleic acids (RNAs) not only play a role in the Central Dogma of Molecular Biology as coding, messenger RNAs but also other roles in catalysis, genome maintenance, regulation, and protein synthesis as noncoding, functional RNAs. The function of noncoding RNAs highly depend on the 3D (tertiary) structure. Before the formation of the tertiary structure, secondary structure (canonical base paring of nucleotide sequences) is first formed independently; thus, it is critical to predict the secondary structure of RNAs first. 

As a visual representation of the secondary structure, the RNA sequence is laid out in a straight line, and the base pairings are represented by connecting arcs (See figure below). Typically, the arcs will be nested. i.e. they will not cross each other (top). However, in certain cases, the arcs do cross (bottom). This special topology is called a pseudoknot which adds significant time complexity to the structure prediction problem (NP hard). As a result, most of the existing prediction programs assume pseudoknot-free structure. However, pseudoknots are often observed in RNAs of functional significance such as ribosomal RNAs, transfer messenger RNAs, and viral RNAs. The current state-of-the-art pseudoknot structure prediction methods have insufficient accuracy. Thus, construct a computational strategy to better predict the pseudoknot-containing RNA secondary structure. 

![alt text](https://github.com/ACalza/UofTBiohacks/blob/master/static/src/RNA%20Secondary%20Struct.png)

#### Useful Readings
* [RNA Structure Prediction: An Overview of Methods](https://drive.google.com/open?id=0B2ujBo4yLWjjdWdlX3pXcVJWX1E)
* [RNA Secondary Structure: Dynamic Programming Over Intervals](https://drive.google.com/open?id=0B2ujBo4yLWjjN2pSWlV1VkxjVkE)
* [IPknot: fast and accurate prediction of RNA secondary structures with pseudoknots using integer programming](https://drive.google.com/open?id=0B2ujBo4yLWjjcUZrdThNM3dBZnc)

#### [List of RNA Structure Prediction Software](https://en.wikipedia.org/wiki/List_of_RNA_structure_prediction_software)

#### Databases of RNA Sequences with Pseudoknots
* [RNA STRAND](http://www.rnasoft.ca/strand/)
* [PseudoBase](http://pseudobaseplusplus.utep.edu/)
