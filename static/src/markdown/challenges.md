#Challenges 

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
