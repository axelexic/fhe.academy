window.MathJax = {
  loader: {load: ['[tex]/color','[tex]/bbox']},
  tex: {
    packages: {'[+]': ['color','bbox']},
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
        ord     :  ["\\text\{ord\}(#1)", 1],
        Zmod    :  ["\\mathbb \{Z\}/\{#1\}\\mathbb \{Z\}", 1],
        inner   : ["\\langle \{#1\}, \{#2\} \\rangle", 2],
        enc     : ["\\operatorname\{enc\}"],
        dec     : ["\\operatorname\{dec\}"],
        eval    : ["\\operatorname\{eval\}"],
        ffrac   : ["\\left\\lfloor\\frac\{#1\}\{#2\}\\right\\rfloor", 2],
        cfrac   : ["\\left\\lceil\\frac\{#1\}\{#2\}\\right\\rceil", 2],
        roundfrac : ["\\left\\lfloor\\frac\{#1\}\{#2\}\\right\\rceil", 2],
        round : ["\\left\\lfloor\{#1\}\\right\\rceil", 1],
        floor   : ["\\left\\lfloor\{#1\}\\right\\rfloor", 1],
        ceil    : ["\\left\\lceil\{#1\}\\right\\rceil", 1],
        mcbox   : ["\\bbox[2px, border: 1px solid red]\{#1\}", 1]
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

