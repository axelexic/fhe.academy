window.MathJax = {
  loader: {load: ['[tex]/color','[tex]/bbox','[unicodeMath]/unicode-math.js' ],
    paths: {unicodeMath: 'https://cdn.jsdelivr.net/npm/@amermathsoc/mathjax-unicode-math@1/browser'}
  },

  tex: {
    packages: {'[+]': ['color','bbox', 'unicode-math']},
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true,
    tags: 'ams',
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
        prob    :  "{\\mathsf \{Pr\}}",
        vec     :  ["\\mathbf \{#1\}", 1],
        ord     :  ["\\text\{ord\}(#1)", 1],
        Zmod    :  ["\\mathbb \{Z\}/\{#1\}\\mathbb \{Z\}", 1],
        inner   : ["\\langle \{#1\},\\;\{#2\} \\rangle", 2],
        range   : ["\{\\unicode\{0x2E28\}\{#1\}\\unicode\{0x2E29\}\}", 1],
        lift    : ["\{\{\\Large\\unicode\{0x27e6\}\}\{#1\}\{\\Large\\unicode\{0x27e7\}\}\}", 1],
        enc     : ["\\operatorname\{enc\}"],
        dec     : ["\\operatorname\{dec\}"],
        eval    : ["\\operatorname\{eval\}"],
        setup   : ["\\operatorname\{setup\}"],
        concat  : ["\\unicode{0x29fa}"],
        ffrac   : ["\\left\\lfloor\\frac\{#1\}\{#2\}\\right\\rfloor", 2],
        cfrac   : ["\\left\\lceil\\frac\{#1\}\{#2\}\\right\\rceil", 2],
        roundfrac : ["\\left\\lfloor\\frac\{#1\}\{#2\}\\right\\rceil", 2],
        round : ["\\left\\lfloor\{#1\}\\right\\rceil", 1],
        floor   : ["\\left\\lfloor\{#1\}\\right\\rfloor", 1],
        ceil    : ["\\left\\lceil\{#1\}\\right\\rceil", 1],
        F       : ["\{\\mathbb\{F\}_\{#1\}\}", 1],
        norm    : ["\{\\left | \{#1\} \\right | \}", 1],
        mathhdr : ["\{\\large\\clubsuit\\quad\{#1\}\}", 1],
        mathftr : "{\\large\\blacksquare}",
        mcbox   : ["\\bbox[2px, border: 1px solid red]\{#1\}", 1],
        adv     : ["\\mathcal\{A\}"],
        poly    : ["\{\\mathsf{poly}\\left(\{#1\}\\right)\}", 1]
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

