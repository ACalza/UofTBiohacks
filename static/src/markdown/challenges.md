# Challenge

## Rethinking Genome Annotation

Our imagination of the genome has matured tremendously. Your challenge is to create a data-driven visual representation of our current understanding of the human genome, 20 years after its initial publishing. Do this either using the data we have curated for you from human chromosome 20 or your choice of human genetic material of similar magnitude.

### Background
What does it mean to be human? Nearly 20 years since the conclusion of the [human genome
project](https://www.genome.gov/10001772/all-about-the--human-genome-project-hgp/),
we know a lot more about gene function than we once did. For tens of thousands
of genes, this amounts to a huge volume of information. How can we improve on
how we associate the existing information for a gene? Consider a gene's
sequence, function, regulation, pathways it participates in, and its associated
protein(s).

Gene annotation and prediction is a process where a gene function or family is
predicted from reading a nucleotide or amino acid sequence. This process is one
of the most important steps in studying the metabolism, phylogeny, and the
overall genomic properties of a sequenced species.

The first two draft sequences of the human genome were published in February of 2001. Three years from now will mark the twentieth anniversary of this accomplishment that like now other has shaped the landscape of bioinformatics, computational biology and molecular medicine. In 2001, [Celera](https://en.wikipedia.org/wiki/Celera_Corporation) - a private company founded three years earlier to commercialize genome information - published an [iconic poster](https://drive.google.com/open?id=1cKZ6O4ahy30cBkrCs360oDnmIDYxfMrm) summarizing their version of the genome. It is still fascinating today. This poster is significant, not so much for its interpretable content, but for the unique perspective it gives us on the entirety of information that constitutes our molecular identity. The details are rich, in fact, surprisingly "modern", presenting features like CpG islands and SNP density, and exon transcripts with Gene Ontology functional categories colour coded, for forward and reverse strand, accurately plotted on the nucleotide backbone at about 500 kB per centimetre. This was computed from gff records with Josep Abril's [gff2ps software](https://www.ncbi.nlm.nih.gov/pubmed/11099262).

But we know so much more today. While the Celera map showed us the genome of one Caucasian male, the number of sequenced genomes has exploded - we envisioned the 1,000 genomes project (2008, completed 2012); quickly set our sights on 100,000 genomes (2012, almost completed), and as of today more than 500,000 human genomes have been sequenced overall. We have sequenced cancers, and genetic diseases. We have sequenced representatives of virtually all ethnicities on the planet. We have even sequenced Neanderthals and Denisovians, and we have sequenced other species far and wide to acquire a sense of where we humans fit into the landscape of evolution. We have annotated the contents of the genome in the ENCODE project. We have built databases that carefully dissect all proteins into their domains, such as InterPro. We have started to outline how things work together in functional networks such as the STRING data, or in modules as published by KEGG, and we are beginning to translate our insights into actionable information for medicine, at the OICR, at Sick Kids' TCAG.

### Deliverables: What you'll be judged on 
* Prototype of your visualization
  * Should be clearly data driven - or the path to making it data driven should be clear
* Code
  * Quality and structure
* Documentation
  * Should include your sources
  * Architecture - get from data to visualization in a sensical way
* Presentation
  
### Data 

We have cleaned up the "wild" data for chromosome 20 for you to use. Download our txt files and you'll find they contain (tab delimited) HUGO gene symbol, and IDs to allow you to find annotations for this gene via crossRef, InterProt domains, STRING DB, GO annotations, etc. We'll also provide sample scripts of how the data was prepared that you can adapt. 

### Starter code

We will provide some starter code to give you some direction. You don't need to use it! Languages supported are R, python, JavaScript. Find these at our github. 

### Tools

* [HUGO](https://www.genenames.org/)
* [Gene Ontology Consortium](http://geneontology.org/)
* [Interpro](https://www.ebi.ac.uk/interpro/)
* [STRING](https://string-db.org/)
* [UCSC genome browser](https://genome.ucsc.edu/)

### Useful Reading

* [GENCODE: The reference human genome annotation for The ENCODE Project](http://genome.cshlp.org/content/22/9/1760.full.html)
* [The Sequence of The Human Genome](https://drive.google.com/open?id=15dxceQvrkhzzy2Vws5mgdzl1l41vUnri)
* [Initial sequencing and analysis of the human genome](https://drive.google.com/open?id=1N0SWJxQ0V8taKQkkaYVhNPnu8E9ku9gr)


