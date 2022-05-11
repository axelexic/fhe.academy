\( \def\exmp{\mathhdr{\mathsf{Example}}} \)
# Glossary of Terms and Notations

## Standard Cryptographic Definitions

??? abstract "Min-Entropy and $k$-source[^Rey11]"

    Let $\mathbf{\chi}$ be a discrete random variable that takes
    values in the finite set $\mathcal{U}:=\{u_1, u_2, \cdots, u_n\}$
    with probabilities $\{ p_1, p_2, \cdots, p_n\}$, i.e,
    $p_i = \prob[X \leftarrow \chi; X = u_i]$. Then the min entropy
    (or _max probability of occurrence_) is denoted
    by $H_\infty(\chi)$ and defined as

    $$
      H_\infty(\chi) := -\log(\max_i \{p_1, p_2, \cdots, p_n\})
    $$

    We say that $\chi$ is a **$k$-source** if $H_\infty(\chi) \geq k$.

    $\exmp$

    Suppose an _unfair dice_ $\chi$ with faces marked $\{1,2,3,4,5,6\}$
    rolls up with probabilities $\{\frac{1}{2}, \frac{1}{12}, \frac{1}{12},
    \frac{1}{12}, \frac{1}{12}, \frac{1}{12}\}$ respectively.
    Then, face $1$ has maximum probability of occurrence and the
    min-entropy of _this dice_ is $H_\infty(\chi) = -\log_2(\frac{1}{2}) = 1$.
    In contrast, shannon entropy -- which measures the average uncertainty
    about the source -- is $\frac{1}{2} + \log_2(3) > 2.$


??? abstract "Statistical Distance"

    Let $X$ and $Y$ be two (discrete) random variables defined over a set
    $\mathcal{U}$. The _statistical distance_ between $X$ and $Y$,
    denoted by $\Delta(X,Y)$ is

    $$
      \Delta(X,Y) = \frac{1}{2}\sum_{u\in \mathcal{U}} \left \vert \prob[X = u] - \prob[Y = u] \right\vert
    $$

    $\exmp$

    Suppose a fair dice with faces marked $\mathcal{U} := \{1,2,3,4,5,6\}$
    rolls up with probability $\frac{1}{6}$ for each face. Let $X$ and $Y$
    be random variables defined as

    $$
      \begin{aligned}
      X &:= \{ \text{Face rolls up to a prime number}\} \implies p_1 = 0, p_2 = \frac{1}{3}, p_3 = \frac{1}{3}, p_4 = 0, p_5 = \frac{1}{3}, p_6 = 0\\
      Y &:= \{ \text{Face rolls up to a multiple of $3$} \} \implies p_1 = 0, p_2 = 0, p_3 = \frac{1}{2}, p_4 = 0, p_5 = 0, p_6 = \frac{1}{2}
      \end{aligned}
    $$

    therefore, the statistical distance between $X$ and $Y$ is

    $$
      \begin{aligned}
      \Delta(X,Y) &= \frac{1}{2} \left (|0 - 0| + |\frac{1}{3} - 0| + |\frac{1}{3} - \frac{1}{2}| + |0 - 0| + |\frac{1}{3} - 0| + |0 - \frac{1}{2}| \right )\\
          &= \frac{1}{2}(\frac{1}{3} + \frac{1}{6} + \frac{1}{3} + \frac{1}{2}) \\
          &= \frac{2}{3}
      \end{aligned}
    $$

??? abstract "Universal Hash Function [CW79][^CW79]"

    A hash family $\mathcal{H} = \{h_i \}_{i=0}^k$, where
    $h_i : U \longrightarrow \{0, 1, \cdots, n-1 \}$, is said to be
    **2-universal** if for all $x,y \in U$ and $x \neq y$

    $$
      \underset{h \xleftarrow{\$} \mathcal{H}}{\prob}\left[h(x) = h(y)\right] \leq \frac{1}{n}
    $$

    $\exmp$

    Suppose
    $\mathbf{A} \xleftarrow{\$} \left(\Zmod{q}\right )^{m\times n}$
    is a random $m \times n$ matrix with $m < n/\log(q)$. Let
    $U := \{0,1\}^n$ and define the hash family, indexed by
    $\mathbf{A}$ as

    $$
      \begin{aligned}
      \mathcal{H} &:  (\Zmod{q})^{m\times n} \times \{0,1\}^n \longrightarrow (\Zmod{q})^m \\
      \mathcal{H}(\mathbf{A}, \vec{x}) &:= h_{\mathbf{A}}(\vec{x}) = \mathbf{A}\cdot \vec{x}
      \end{aligned}
    $$

    where $(\Zmod{q})^m$ is interpreted as $m\log(q)$ bitstring.

    **Claim**: $\mathcal{H}$ is $2$-universal. Let $\vec{x}, \vec{y} \in \{0,1\}^n$ with $x \neq y$ and let $\mathbf{A}$ be a random $m\times n$
    matrix. Then, for a given $\mathbf{A}$, the probability of collision
    is

    $$
      \begin{aligned}
      \prob[\mathbf{A}\cdot \vec{x} = \mathbf{A}\cdot \vec{y}] &=
      \prob[\mathbf{A}\cdot (\vec{x} - \vec{y}) = \vec{0}] \\
       &= \prob[\mathbf{A}\cdot \vec{z} = \vec{0} \wedge \vec{z} \in \{-1,0,1\}]
      \end{aligned}
    $$

    Since $m < n$, the system of linear equations is under-determined and
    therefore has $3^{(n - m)}$ solutions. Therefore, the probability of
    collision is $\frac{3^{(n - m)}}{q^m}.$

??? abstract "Randomness Extractor [Vad12, Ch 6 ][^Vad12] "

    A function
    $\operatorname{Ext} : \{0,1\}^n \times \{0,1\}^d \longrightarrow \{0,1\}^m$
    is a $(k,\epsilon)$-**seeded extractor** if for _every_ $k$-source $X$ on
    $\{0,1\}^n$ and a uniformly random seed $\psi \xleftarrow{\$} U_d$,

    $$
    \Delta(\operatorname{Ext}(X, \psi), U_m) \leq \epsilon.
    $$

    where the distribution of $\operatorname{Ext}(X, \psi)$ is _independent_
    of the distribution on $\psi$, i.e., $\psi$ can be re-used as a seed
    for something else and can even be made public without compromising
    the uniform randomness guarantee of $\operatorname{Ext}(X, \psi)$.


??? abstract "Leftover Hash Lemma [HILL99][^HILL99] "

    Leftover Hash Lemma (LHL) says that Universal Hash Functions are
    good randomness extractors.

    More formally, let $X$ be a $k$-source
    (i.e., $X$ has min-entropy $k$) and let $\epsilon < 1$ be a fixed
    parameter. Let $\mathcal{H}$ be a
    family of $2$-universal hash functions indexed by a $d$-bit seed
    (i.e., $|\mathcal{H}| = 2^d$) such that forall $h_i \in \mathcal{H}$,
    $h_i : X \longrightarrow \{0,1\}^{k - 2\log(\frac{1}{\epsilon})}$, then

    $$
      \underset{i \xleftarrow{\$} U_{2^d}}{\operatorname{Ext}}(x, i) = h_i(x)
    $$

    is a strong $(k, \epsilon/2)$ extractor, with seed $i$ (which is chosen by
    the user).

??? summary "Learning With Error Problem"

    The search and decisional LWE problems are parameterized by a
    dimension $n \in \ZZ$ and modulus $q \gg n$. Let $R$ be a ring
    (either $\ZZ$ or $\ZZ[X]/\langle f(X) \rangle$, where
    $\deg(f) = n$), and $R_q := R/\langle q \rangle$. Let
    $\Gamma_{n}$ and $\Xi_n$ be two oracles that both produce
    samples of the form $(\vec{a}_i, b_i) \in R_q^n\times R_q$,
    where $\vec{a}_i$ is always sampled uniformly at random by
    both $\Gamma_n$ and $\Xi_n$.

    Between $\Gamma_n$ and $\Xi_n$, one of the oracles samples
    $b_i$ uniformly at random (i.e.,  $b_i \xleftarrow{\$} R_q$),
    while the other computes $b_i$ as follows:

    $$
      b_i = \inner{\vec{a}_i}{\vec{s}} + e_i.
    $$

    Here $\vec{s}$ is sampled _uniformly at random_ and $e_i$ is
    sampled from some distribution $\bar{\chi}$ over $R_q$ (or
    equivalently, from some "narrow" distribution $\chi$ over $R$
    then reduced modulo $q$). Furthermore, it's assumed that the
    distribution $\bar{\chi}$ is known to the adversary.

    The **decisional LWE problem** asks an adversary to distinguish
    between $\Gamma_n$ and $\Xi_n$. The _decisional LWE assumption_
    states that given $\poly{n}$ samples as above where min-entropy
    $H_\infty(\chi) > 0$, a computationally bounded (quantum)
    adversary cannot distinguish between $\Gamma_n$ and $\Xi_n$.

    The **search LWE problem** asks an adversary to find $\vec{s}$ assuming
    the oracle was generating samples of the form $(\vec{a}_i, \inner{\vec{a}_i}{\vec{s}} + e_i)$.

    $\mathhdr{\text{Lemma}}\quad$ [ACPS09, Lemma 1][^ACPS09]

    Let $p = \poly{n}$ be prime, and
    $q = p^k$. Let $\bar{\chi}$ be a distribution defined over
    the ring $\Zmod{p^k}$ that takes values in the narrow range
    $\{ -\frac{p-1}{2}, \cdots, \frac{p-1}{2}\} \subseteq \Zmod{p^k}$
    with overwhelming probability. Let $\mathcal{A}_{\vec{s}
    \leftarrow \bar{\chi},\bar{\chi}}$
    be a PPT adversary that can solve LWE problem when
    $\vec{s}$ and $e_i$s are drawn from $\bar{\chi}$,
    then there exists another PPT adversary $\mathcal{B}_{\vec{s}
    \leftarrow U,\bar{\chi}}$ that can also solve the LWE problem
    when $\vec{s}$ is drawn uniformly at random from $\Zmod{p^k}$
    and $e_i$s is drawn from $\bar{\chi}$.


## Standard Notations

| Term      | Meaning                                           |
|---------------|---------------------------------------------------|
| $x := y$      | Define $x$ to be equal to the expression $y$      |
| $x \concat y$ | Concatenate $x$ and $y$ and create a new vector   |
| Bold lowercase letter, e.g., $\vec{x}$   | Column vector $\vec{x}$|
| Bold uppercase letter, e.g., $\mathbf{A}$ | Matrix $\mathbf{A}$   |
| $f(n)$ is $O(g(n))$  | $f(n)$ eventually grows strictly slower than $g(n)$, i.e., $\exists\, n_0, c$ such that $\forall n > n_0$, $f(n) < c\cdot g(n)$ |
| $f(n)$ is $\Omega(g(n))$  | $f(n)$ eventually grows strictly faster than $g(n)$, i.e., $\exists\, n_0, c$ such that $\forall n > n_0$, $f(n) > c\cdot g(n)$ |
| $f(n)$ is $\Theta(g(n))$  | $f(n)$'s values are eventually bounded between  $c_0\cdot g(n)$ and $c_1 \cdot g(n)$, i.e., $\exists\, n_0, c_0, c_1$ such that $\forall n > n_0$, $c_0\cdot g(n) < f(n) < c_1\cdot g(n)$ |
| $f(n)$ is $\tilde{O}(g(n))$ | $f(n)$ is $O(g(n)\log^k(n))$  for some $k > 0$ |
| linear time algorithm | Algorithmic complexity is $O(n)$ or even $\Theta(n)$ |
| quasilinear time algorithm | Algorithmic complexity is $\tilde{O}(n)$, i.e., $O(n\log^k(n))$ |


[^Rey11]: Leonid Reyzin, [Some Notions of Entropy for
    Cryptography](https://www.cs.bu.edu/~reyzin/papers/entropy-survey.pdf)
    - (invited talk). In Serge Fehr, editor, ICITS, volume 6673 of
    Lecture Notes in Computer Science, pages 138–142. Springer,
    2011.

[^CW79]: J. L. Carter and M. N. Wegman, [Universal Classes of Hash
    Functions](https://www.sciencedirect.com/science/article/pii/0022000079900448).
    In _Journal of Computer and System Sciences_, Volume 18, Issue
    2, April 1979, Pages 143-154.

[^Vad12]: S. P. Vadhan,
    [Pseudorandomness](https://www.nowpublishers.com/article/Details/TCS-010),
    Foundations and Trends in Theoretical Computer Science:
    Vol. 7: No. 1–3, pp 1-336, 2012.

[^HILL99]: J. Hastad, R. Impagliazzo, L.A. Levin, and M. Luby,
  [Construction of pseudorandom generator from any one-way
  function](https://epubs.siam.org/doi/10.1137/S0097539793244708).
  SIAM Journal on Computing, 28(4):1364–1396, 1999.

[^ACPS09]: B. Applebaum, D. Cash, C. Peikert and A. Sahai, [Fast
  Cryptographic Primitives and Circular-Secure Encryption Based on
  Hard Learning Problems](https://www.iacr.org/archive/crypto2009/56770585/56770585.pdf). In _Advances in Cryptology - CRYPTO 2009,
  29th Annual International Cryptology Conference_, vol: 5677,
  pages: 595-618, 2009
