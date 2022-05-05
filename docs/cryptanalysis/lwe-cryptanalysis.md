# LWE Cryptanalysis

??? abstract "Learning With Errors Problem"

    Let $n, q = \poly{n}$ be integers and let $\chi$ be a discrete probability distribution over integers and $\bar{\chi}$ the distribution obtained by reducing $x \xleftarrow{\$} \chi \mod q$.

    Let $\vec{s}$ be a secret vector sampled _uniformly_ at random
    from $(\Zmod{q})^n$. Given $m = \poly{n}$ ($m > n$) samples of
    the form

    $$
      \begin{aligned}
        \left \{ (\vec{a}_1, b_1),
           (\vec{a}_2, b_2), \cdots,
           (\vec{a}_m, b_m) \right
        \} \\
      \end{aligned}
    $$

    where,

    \[
      \begin{aligned}
        \vec{a}_i &\xleftarrow{\;\$\;} (\Zmod{q})^n \\
        e_i &\xleftarrow{\;\$\;} \bar{\chi} \\
        b_i &= \inner{\vec{a}_i}{\vec{s}} + e_i
      \end{aligned}
    \]

    find $\vec{s}$.


## Classical Cryptanalysis

### Naive Sampling
Given $(\vec{a}, b)$ LWE samples, if $\vec{a} := \begin{pmatrix} 0 &
\cdots & 0 & x & 0 &\cdots& 0\end{pmatrix}$ is of the form that
all entries of $\vec{a}

### Maximum Likelihood


## Quantum Cryptanalysis


