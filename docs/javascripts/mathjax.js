window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
    equationNumbers: { autoNumber: "AMS" },
    macros: {
        FqBar   :  "{\\overline\{\\mathbb\{F\}\}_q}",
        Fq      :  "{\\mathbb \{F\}_q}",
        Fp      :  "{\\mathbb \{F\}_p}",
        FpBar   :  "{\\overline\{\\mathbb\{F\}\}_p}",
        ZZ      :  "{\\mathbb \{Z\}}",
        RR      :  "{\\mathbb \{R\}}",
        CC      :  "{\\mathbb \{C\}}",
        QQ      :  "{\\mathbb \{Q\}}",
        P       :  "{\\mathsf \{P\} }",
        NP      :  "{\\mathsf \{NP\} }",
        coNP    :  "{\\mathsf \{coNP\} }",
        BPP     :  "{\\mathsf \{BPP\} }",
        RP      :  "{\\mathsf \{RP\} }",
        AM      :  "{\\mathsf \{AM\} }",
        PSPACE  :  "{\\mathsf \{PSPACE\} }",
        NL      :  "{\\mathsf \{NL\} }",
        IP      :  "{\\mathsf \{IP\} }",
        PRIMES  :  "{\\mathsf \{PRIMES\}}",
        vec     :  ["\\mathbf \{#1\}", 1],
        ord     :  ["\\text\{ord\}(#1)", 1]
    }
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  }
};

document$.subscribe(() => {
  MathJax.typesetPromise()
})

