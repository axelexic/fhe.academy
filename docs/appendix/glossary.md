\( \def\exmp{\mathhdr{\mathsf{Example}}} \)
# Glossary of Terms and Notations

## Standard Cryptographic Definitions

??? abstract "Min-Entropy and $k$-source[^Rey11]"

    Let $\mathbf{\chi}$ be a discrete random random variable that takes
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
    rolls up with probabilities $\{\frac{1}{12}, \frac{1}{6}, \frac{3}{8},
    \frac{1}{8}, \frac{1}{6}, \frac{1}{12}\}$ respectively.
    Then, face $3$ has maximum probability of occurrence and the
    min-entropy of _this dice_ is $H_\infty(\chi) = \log_2(\frac{8}{3})$.
    Note that min-entropy is a property of the source!

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