# Brakerski, Gentry and Vaikuntanathan (BGV) Scheme

## Introduction

Brakerski, Gentry and Vaikuntanathan [BGV][^BGV] scheme is a
_leveled_ homomorphic encryption scheme based on [tensor product of
ciphertexts to achieve homomorphic
multiplication](fhe-from-tensoring.md). In its most generality, BGV
can be defined over _generalized learning with errors problem_,
which includes LWE, Ring-LWE, and module-LWE problem, but in this
post, we restrict the discussion to Ring-LWE over a power of two
cyclotomic field.

## Notation

Let $\mathcal{D}$ be a probability distribution defined over a set
$R$, which can be discrete or continuous, finite of infinite. We
use the notation

$$
x \xleftarrow{\mathcal{D}} R
$$

to mean a random sample $x$ drawn according to the distribution
$\mathcal{D}$ over $R$. For example $x \xleftarrow{\mathsf{DGS}}
\ZZ$ means $x$ is drawn from a discrete gaussian distribution over
integers. When $R$ is _discrete and finite_, the symbol ${\$}$ means
a uniform distribution. For example, $x \xleftarrow{\$} (\Zmod{6})$
 means $x$ is drawn uniformly at random from $\Zmod{6}$.


For a positive integer $m$, we denote by $\ZZ_m$ the quotient ring
$\Zmod{m}$, i.e., the ring of integers modulo $m$. We denote by
$\ZZ_m^*$ the group of units in $\ZZ_m$, i.e., those elements in
$\ZZ_m$ that have a multiplicative inverse. Therefore, by
definition, $|\ZZ_m^*| = \phi(m)$, where $\phi$ is the Euler's
totient function.

For a positive integer $m$, we define $[[m]] := \{0, 1, 2, \cdots,
(m-1) \}$, i.e., the set of non-negative integers less than $m$.
Note that $[[m]]$ is only a set of integers, and is different from
$\ZZ_m = \{m\ZZ, 1 + m\ZZ, \cdots, (m-1) + m\ZZ \}$, which is a
**set of** _set of integers_ with a well defined addition and
multiplication structure (while $[[m]]$ is not even closed under
addition).

If $x \in \ZZ_m$, then we define $\lift{x}_m$ as the numerically least
residue of $x$, i.e, $\lift{x}_m$ is an integer $y$ such that
$-\frac{m}{2} \leq y < \frac{m}{2}$ and $x = y\;\text{mod}\, m$.
More formally,

$$
\begin{aligned}
\lift{\cdot}_m &: \ZZ_m \rightarrow \ZZ \\
\lift{x}_m &= \begin{cases}
y & \text{where}\, y \in \{x + m\ZZ\} \wedge (0 \leq y < \frac{m}{2}) \\
y - m  & \text{where}\, y \in \{x + m\ZZ\} \wedge (\frac{m}{2} \leq y < m)
\end{cases}
\end{aligned}
$$

$\mathhdr{\text{Example}}$

Consider the ring $\ZZ_7$. Let $x := 11 + 7\ZZ \in \ZZ_7$, then

$$
\lift{11}_7 = 4 - 7 = -3 \in \ZZ
$$

since $y = (4 \in 11 + 7\ZZ) \wedge (\frac{7}{2} \leq y < 3)$.

$\mathftr$

Let $\vec{a}(X) = \sum a_iX^i \in (\Zmod{q})[X]$ be a polynomial. We
extend the definition of $\lift{\cdot}_q$ to polynomials as

$$
\begin{aligned}
  \lift{\cdot}_q &: (\Zmod{q})[X] \rightarrow \ZZ[X]\\
  \lift{\sum a_iX^i}_q &= \sum \lift{a_i}_q X^i
\end{aligned}
$$

### Roots of Unity and Cyclotomic Polynomials

Let $m$ be an integer and $k$ be either $\QQ$ or $\mathbb{F}_{p^h}$.
An element $\omega$ in the algebraic closure $\bar{k}$ of $k$, is
called an $m$-th **root of unity** if $\omega^m = 1$. In other
words, $\omega$ is a root of the equation $f(x) = X^m -1 \in
 k[X]$. Let

$$
\Omega_m^k := \{\omega_1, \omega_2, \cdots \}
$$

be the set of all _distinct_ roots of the equation $X^m = 1$ in
$\bar{k}$. Since $X^m-1$ can have at most $m$ roots,
$\norm{\Omega_m^k} \leq m$. When $k = \QQ$ or $\mathbb{F}_{p^h}$
with $p \nmid m$, $X^m - 1$ is separable and $X^m -1$ has exactly
$m$ root, therefore $\norm{\Omega_m^k} = m$. When $p \mid m$, say $m
= p^\alpha\cdot l$ (with $p \nmid l$) then

$$
  X^m - 1 =  X^{p^\alpha l} - 1 = (X^l-1)^{p^\alpha} = 0
$$

has $l$ distinct roots and $\norm{\Omega_m^k} = l$.

??? abstract "Lemma: $\left(\Omega_m^k, \times\right)$ is a finite group"

    - **Identity**: Since $1$ is always a root of $X^m - 1$, $1 \in \Omega_m^k$.

    - **Closure**: Let $\omega_1, \omega_2 \in \Omega_m^k$. Then $1 = 1\cdot 1 = (\omega_1)^m (\omega_2)^m = (\omega_1\cdot\omega_2)^m \implies \omega_1\cdot\omega_2 \in \Omega_m^k.$

    - **Inverse**: Let $\omega \in \Omega_m^k$ and let $l$ be a positive integer. Then $1 = 1^l = \left(\omega^m\right)^l = \left(\omega^l\right)^m$ $\implies$ $\omega^l$ is also an $m$-th root of unity -- by definition. That means, $\omega^{m-1}$ is an $m$-th root of unity $\implies \omega\cdot \omega^{m-1} = \omega^m = 1$, and $\omega^{m-1}$ is the inverse element of $\omega$.


??? abstract  "Lemma: $\left(\Omega_m^k, \times\right)$ is cyclic"

    Let $h := \norm{\Omega_m^k}$ be the order of $\Omega_m^k$, i.e.,
    $h = m$ or $h = l$ if $m = p^\alpha l$. Let $\norm{\omega} \in \ZZ$
    denote the multiplicative order of $\omega \in \Omega_m^k$, i.e.,
    of all integers $j \in \ZZ$, $\norm{\omega}$ is the smallest
    _positive integer_ such that $\omega^j = 1$.

    Let $\mathcal{D} := \{ d : d | h \}$ be the set of all factors
    of  $h$. For each $d \in \mathcal{D}$ we collect all elements of
    $\Omega_m^k$ whose order is $d$ as:

    $$
      \mathcal{A}_d := \{ \omega \in \Omega_m^k : \norm{\omega} = d \}
    $$

    Suppose $\mathcal{A}_d$ is not empty, and let $\omega \in \mathcal{A}_d$.
    Consider the subgroup of $d$-th roots of unity, i.e., $\Omega_d^k$. By definition,
    $\omega$ is element of $\Omega_d^k$ and so is every element of the
    cyclic subgroup $\langle \omega \rangle$ generated by $\omega$. Therefore

    $$
      \langle \omega \rangle \subseteq \Omega_d^k
    $$

    However, $\norm{\langle \omega \rangle} = d$ and $\norm{\Omega_d^k} = d$
    therefore $\langle \omega \rangle = \Omega_d^k$. That means
    every element of $\mathcal{A}_d$ is a generator of $d$-th root of unity.
    Since there are $\phi(d)$ generators of a cyclic subgroup,

    $$
      \norm{\mathcal{A}_d} = \phi(d).
    $$

    To prove that $\Omega_d^k$ is cyclic, if we can show that
     $\norm{\Omega_h^k} = \sum_{d \mid h} \norm{\mathcal{A}_d}$ then
     that would mean that elements of  $\mathcal{A}_h$ generate
     $\Omega_h^k$. But this is immediate, since
     $\sum_{d \mid h} \norm{\mathcal{A}_d} = \sum_{d \mid h} \phi(d) = h$.

    $\mathhdr{}$ Proof run-through

    Let $k = \QQ$ and consider the $12$th roots of unity
    $\Omega_{12}^{\QQ} := \{1, e^{2\pi\vec{i}\frac{1}{12}}, e^{2\pi\vec{i}\frac{2}{12}}, \cdots, e^{2\pi\vec{i}\frac{11}{12}} \}$. Then $\mathcal{D} := \{1, 2, 3, 4, 6, 12 \}$,

    $$
      \begin{aligned}
        \mathcal{A}_1 &:= \{ 1 \} \\
        \mathcal{A}_2 &:= \{ e^{2\pi\vec{i}\frac{6}{12}} \} \\
        \mathcal{A}_3 &:= \{ e^{2\pi\vec{i}\frac{4}{12}}, e^{2\pi\vec{i}\frac{8}{12}} \}  \\
        \mathcal{A}_4 &:= \{ e^{2\pi\vec{i}\frac{3}{12}}, e^{2\pi\vec{i}\frac{9}{12}} \} \\
        \mathcal{A}_6 &:= \{ e^{2\pi\vec{i}\frac{2}{12}}, e^{2\pi\vec{i}\frac{10}{12}} \} \\
        \mathcal{A}_{12} &:= \{ e^{2\pi\vec{i}\frac{1}{12}}, e^{2\pi\vec{i}\frac{5}{12}}, e^{2\pi\vec{i}\frac{7}{12}}, e^{2\pi\vec{i}\frac{11}{12}} \} \\
      \end{aligned}
    $$

    and

    $$
      \begin{aligned}
        \Omega_1^k &:= \{ 1 \} \\
        \Omega_2^k &:= \{ 1, e^{2\pi\vec{i}\frac{1}{2}} \} \\
        \Omega_3^k &:= \{ 1, e^{2\pi\vec{i}\frac{1}{3}}, e^{2\pi\vec{i}\frac{2}{3}} \}  \\
        \Omega_4^k &:= \{ 1 , e^{2\pi\vec{i}\frac{1}{4}}, e^{2\pi\vec{i}\frac{2}{4}}, e^{2\pi\vec{i}\frac{3}{4}},\} \\
        \Omega_6^k &:= \{ 1 , e^{2\pi\vec{i}\frac{1}{6}}, e^{2\pi\vec{i}\frac{2}{6}}, e^{2\pi\vec{i}\frac{3}{6}}, e^{2\pi\vec{i}\frac{4}{6}}, e^{2\pi\vec{i}\frac{5}{6}}\} \\
        \Omega_{12}^k &:= \{ 1 , e^{2\pi\vec{i}\frac{1}{12}}, \cdots, e^{2\pi\vec{i}\frac{11}{12}}\} \\
      \end{aligned}
    $$

    And notice that if we pick $\omega = e^{2\pi\vec{i}\frac{10}{12}}$
    from $\mathcal{A}_6$, then the cyclic group

    $$
      \left \langle e^{2\pi\vec{i}\frac{10}{12}} \right \rangle = \{ e^{2\pi\vec{i}\frac{5}{6}}, e^{2\pi\vec{i}\frac{4}{6}}, e^{2\pi\vec{i}\frac{3}{6}}, e^{2\pi\vec{i}\frac{2}{6}}, e^{2\pi\vec{i}\frac{1}{6}}, 1 \} = \Omega_6^k.
    $$

    Similarly, $\omega = e^{2\pi\vec{i}\frac{2}{12}}$ is the
    other element in $\mathcal{A}_6$ and also generates the same
    set $\Omega_6^k$ (verify), validating the claim that
    $\norm{\mathcal{A}_6} = \phi(6) = 2.$

    $\mathftr$

Since $(\Omega_m^{k}, \times)$ is cyclic, we call the generators of
this group, the **primitive** $m$-th roots of unity and denote this
set by $\Omega_m^{*k}$. Let $\omega$ be a primitive $m$-th root.
Then, there exists a natural group homomorphism $h_\omega$ between
$(\ZZ_m, +)$ and $(\Omega_m^{k}, \times)$ give by

$$
  \begin{aligned}
  h_\omega &: \ZZ_m \rightarrow \Omega_m^k \\
  h_\omega(i) &= \omega^i.
  \end{aligned}
$$

Since this is a finite injective map, its a bijection. Furthermore,
for every $i$ co-prime to $m$, $\norm{\omega^i} = \norm{\omega}$,
and therefore $\omega^i$ is also primitive. In other words, there's
a bijection between $\ZZ_m^*$ and $\Omega_m^{*k}$.

Let $\Phi_m(X)$ be a polynomial whose roots are _primitive_ $m$-th
roots of unity, i.e.,

$$
  \Phi_m(X) := \prod_{\omega \in \Omega_m^{*k}} (X - \omega).
$$

$\Phi_m(X)$ is called the **$m$-th cyclotomic polynomial**. A-priori,
we know that $\Phi_m(X)$ is a monoic polynomial, whose coefficients
are in $\bar{k}$. However, when $k=\QQ$, its well known that

- $\Phi_m(X)$ has all its coefficients contained in $\ZZ$, i.e.,
  $\Phi_m(X) \in \ZZ[X]$, and
- $\Phi_m(X)$ is irreducible over $\QQ$.

The following formula are also well known:

$$
  X^m - 1 = \prod_{d | m} \Phi_d(X).
$$

## BGV encryption scheme

The BGV encryption scheme is based on decisional (Ring)-LWE
assumption, and is similar to a scheme proposed by Regev in
[Reg05][^Reg05] and [Reg10][^Reg10].

Let $\Phi_m(X)$ be the $m$-th cyclotomic polynomial of degree $n =
\phi(m)$. Let $q, p \in \ZZ$ be the ciphertext and plaintext modulus
respectively, with  $q \gg p$ and $q, p \in \poly{n}$. Let
$\bar{\Phi}_m$ denote the image of $\Phi_m$ modulo $q$ or $p$.

$$
\begin{aligned}
R &:= \ZZ[Y]\large /\langle \Phi_m(Y)\rangle \\
R_q &:= \ZZ[Y]\large/\langle \Phi_m(Y), q\rangle \cong (\Zmod{q})[X]\large/\langle
\bar{\Phi}_m(X) \rangle \\
R_p &:= \ZZ[Y]\large/\langle \Phi_m(Y), p\rangle \cong (\Zmod{p})[X]\large/\langle
\bar{\Phi}_m(X) \rangle
\end{aligned}
$$

Let $\vec{\chi}$ be a "narrow" distribution defined over the
polynomial quotient ring $R$ and let $\bar{\vec{\chi}}$ denote the
distribution with finite support obtained by sampling $e(X)
\xleftarrow{\vec{\chi}} R$ and reducing $\vec{e}(X)$ modulo $q$.
Let, $B$ be an integer such that $B\cdot p \ll q$ and
$\Pr[|\vec{e}(X)| > B : \vec{e}(X) \xleftarrow{\bar{\vec{\chi}}}
R_q]$ is negligible, i.e., the norm of any sampled error term
$\vec{e}(X)$ is bounded by $B$, with an overwhelming probability.

Recall that under _decisional Ring-LWE assumption_, one is given two
oracles $\Xi$ and $\Gamma$, both of which produce samples of the
form $(\vec{a}_i(X), \vec{b}_i(X)) \in R_q^n\times R_q$.
Furthermore, $\vec{a}_i(X)$ is sampled uniformly at random by both
$\Xi$ and $\Gamma$, but $\vec{b}_i(X)$ is computed differently as

- $\vec{b}_i(X) \xleftarrow{\$} R_q$ is sampled uniformly at random
  by one of $\Xi$ or $\Gamma$, while
- $\vec{b}_i(X) = \vec{a}_i(X)\vec{s}(X) + \vec{e}_i(X)$, where
  $\vec{s}(X) \xleftarrow{\$} R_q$ and $\vec{e}_i(X)
  \xleftarrow{\bar{\vec{\chi}}} R_q$, by the other oracle.

The decisional (Ring)-LWE assumption states that no polynomial time
(quantum) adversary can distinguish between $\Xi$ and $\Gamma$ using
$\poly{n}$ samples. In other words, Ring-LWE samples are
pseudorandom.

**Notation**: From now on, we write polynomials without the
indeterminate $X$, i.e, $\vec{a}_i(X)$ is simply written
as $\vec{a}_i$, etc.

### Symmetric-Key encryption from Ring-LWE

Building a semantically secure secret-key encryption scheme from any
pseudorandom sequence defined over a finite field (or ring) is
almost immediate: Just add the message to a pseudorandom sample
(i.e., compute the one-time pad in the appropriate field). At a high
level, this is semantically secure because in any ring, the addition
operation forms a group which defines a permutation over the
elements of the ring. Therefore, if $\rho \xleftarrow{\$} R_q$ is a
(pseudo) random element (not known to the adversary), then for all
$x, y_1, y_2 \in R_q$, $\prob[x + \rho = y_1] = \prob[y_1 - x =
\rho] = \frac{1}{|R_q|} = \prob[x + \rho = y_2]$. This proof can be
made more precise using hybrid argument.

In the context of Ring-LWE, for plaintext $m \in [[p]] \subseteq \ZZ$,
secret key $\vec{s} \xleftarrow{\$} R_q$, and error $\vec{e}
\xleftarrow{\chi} R$, the encryption and decryption can be defined
as:

$$
\begin{aligned}
\enc(\vec{s}, m) = \vec{c} &:= (\vec{a},\vec{b})\;\text{where}\\
\vec{a} & \xleftarrow{\$} R_q\\
\vec{b} &:= \lift{\vec{a}\cdot\vec{s}}_q +
  p\vec{e} + m\;(\text{mod}\, q) & \in R_q
\end{aligned}
$$

and given ciphertext $\vec{c} \in R_q\times R_q$  and access to the
secret key $\vec{s}$, one can decrypt as:

$$
\begin{aligned}
\dec(\vec{s}, (\vec{a}, \vec{b})) = m &:= \underbrace{\lift{\vec{b}
- \vec{a}\cdot\vec{s}}_q}_{\in R}\;(\text{mod}\, p) & \in [[p]]
\end{aligned}
$$

Note that the decryption process computes $\vec{b}
-\vec{a}\cdot\vec{s} \in \ZZ[X]/\langle \Phi_m, q \rangle$ and lifts
it to $\ZZ[X]/\langle \Phi_m \rangle$. Usually a modulo reduction
from $\ZZ \mapsto \ZZ_q$ followed by a lift from $\ZZ_q \mapsto \ZZ$
is not an identity operation. However, since $p|\vec{e}| \ll q$ with
overwhelming probability, $|p\vec{e} + m|$ $\leq (|p\vec{e}| + p) \ll
q$. Therefore, $\lift{\vec{b} -\vec{a}\cdot\vec{s}}_q$ $= \lift{p\cdot \vec{e}
+ m}_q \stackrel{\small{\textsf{whp}}}{=} p\cdot \vec{e} + m$, and
  correctness of decryption follows immediately!

??? example

    Let $m = 8, q = 1024, p = 8$ and $B = 20.$ To keep things
    manageable in this toy example, we will work with the $8$-th
    cyclotomic polynomial $\Phi_8(X) = X^4 + 1$.

    Let $\vec{\chi}$ be the $4$
    dimensional discrete gaussian distribution over $\ZZ$ with
    standard deviation $2$ (so the probability of sampling a value
    greater than $10$ times the standard deviation, i.e., $B = 20$
    is miniscule). Also, note that $p\cdot B \ll q$ as needed.

    Let $R = \ZZ[Y]/\langle Y^4 + 1 \rangle$ and
    $R_q = (\Zmod{q})[X]/\langle X^4 + 1 \rangle$. We use different
    indeterminates $Y$ and $X$ in $R$ and $R_q$ to emphasize that
    these two are different rings that requires an explicit base-change
    to map elements of one ring to the another.

    Let $\vec{s} := 760X^3 + 272X^2 + 340X + 174 \xleftarrow{\$} R_q$
    be the secret key. Let  $m = 5 \in [8]$ be the plaintext.
    Then, the ciphertext can be computed as:

    $$
      \begin{aligned}
        \vec{a} &= 782X^3 + 630X^2 + 389X + 410 \xleftarrow{\$} R_q \\
        \vec{e} &= 4Y^3 + 2Y^2 - 3Y \xleftarrow{\vec{\chi}} R \\
        \vec{a}\cdot \vec{s} &= 700X^3 + 744X^2 + 958X + 988 \in R_q \\
        \lift{\vec{a}\cdot \vec{s}}_q &= -(324Y^3 + 280Y^2 + 66Y + 36) \in R \\
        \lift{\vec{b}}_q &= \lift{\vec{a}\cdot \vec{s}}_q + p\vec{e} + m \in R      \\
            &= -(324Y^3 + 280Y^2 + 66Y + 36) + 8(4Y^3 + 2Y^2 - 3Y) + 5 \\
            &= -(292Y^3 + 264Y^2 + 90Y + 31) \\
        \vec{b} &= \lift{\vec{b}}_q\;\text{mod}\, q \\
                &= 732X^3 + 760X^2 + 934X + 993 \in Rq \\
        \enc(m) &= (782X^3 + 630X^2 + 389X + 410, 732X^3 + 760X^2 + 934X + 993) \in R_q \times R_q
      \end{aligned}
    $$

    Given the ciphertext $\vec{c} = (\vec{a}, \vec{b}) := (782X^3 + 630X^2 + 389X + 410,
    732X^3 + 760X^2 + 934X + 993)$, we can compute the plaintext as follows

    $$
      \begin{aligned}
        \vec{a}\cdot\vec{s} &= 700X^3 + 744X^2 + 958X + 988 \in R_q \\
        \vec{b} - \vec{a}\cdot\vec{s} &= 32X^3 + 16X^2 + 1000X + 5 \in R_q \\
        \lift{\vec{b} - \vec{a}\cdot\vec{s}}_q &= 32Y^3 + 16Y^2 - 24Y + 5 \in R \\
        \dec(\vec{c}) &= \lift{\vec{b} - \vec{a}\cdot\vec{s}}_q\;(\text{mod}\, p) \in [[p]] \\
                      &= 32Y^3 + 16Y^2 - 24Y + 5\;(\text{mod}\, 8) \in [[p]]  \\
                      &= 5
      \end{aligned}
    $$


### Public-Key encryption from Ring-LWE

Ron Rothblum in [Rot11][^Rot11] described a generic technique for
converting any (distribution-preserving) symmetric-key
additively-homomorphic encryption scheme into a public-key
additively homomorphic scheme. The basic idea is:

- To first use the secret-key to compute _multiple encryptions_ of
  zeros and publish the encryptions of zeros _as the public-key_.

- To encrypt a message $m$ _using the public-key_, one computes the
  random subset-sum of encryptions of zeros from the public-key, and
  use it as an one-time-pad to blind the message.

Note that for this public-key encryption scheme to work, it's
crucial that the subset-sum of encryptions of zeros preserve the
distribution of ciphertext. ([Rot11] proves something stronger,
which we don't discuss here.)

BGV uses the above template to create the public-key encryption
scheme. As noted in the general description of [FHE from tensor
products](./fhe-from-tensoring.md#multiplicative-homomorphism), we
will also use the _normalized secret key_ and the _normalized
ciphertext_ going forward.

|               |  Description |
| --------------|--------------------------------------------------|
| **Setup**     | $\lambda$ := Security parameter <br/><ul><li>$m=O(\lambda)$ $m$-th cyclotomic polynomial</li><li>$n=\phi(m)$ Lattice dimension</li><li>$q=\tilde{O}(n)$ ciphertext modulus</li><li>$p=O(n)$ plaintext modulus</li><li>$B=O(n)$ error spread satisfying $B\cdot p \ll q$</li><li> $R := \ZZ[Y]/\langle \Phi_m \rangle$</li><li>$R_q := \ZZ_q[X]\langle \bar{\Phi}_m \rangle$, where $\bar{\Phi}_m := \Phi_m\;\text{mod}\,q$</li><li>$\vec{\chi}$: error distribution over $\ZZ[X]/\langle \Phi_m \rangle$ such that $\prob\left[ \norm{\vec{x}} > B\; :\; \vec{x} \xleftarrow{\chi} \ZZ[X]/\langle \Phi_m \rangle \right] < \epsilon$</li><li>$\bar{\vec{\chi}}$: error distribution over $\ZZ_q[X]/\langle \bar{\Phi}_m \rangle$ computed by sampling $\vec{x} \xleftarrow{\chi} \ZZ[X]/\langle \Phi_m \rangle$ and returning $\vec{x}\; \text{mod}\, q$</li></ul>|
| **KeyGen**        | <ul> <li>Generate secret polynomial: <br/>$\vec{s}' \xleftarrow{\chi} \ZZ_q[X]/\langle \bar{\Phi}_m \rangle$</li><>Set secret-key as $\vec{s} := \{1, \vec{s}'\}$ </li><li>Compute public-key as $n\log(q)$-dimensional vector<br/>$\vec{p} := \{(\vec{a}_i, \vec{a}_i\cdot \vec{s} + p\vec{e}_i) \}_{i=1}^{n\log(q)} \in \left(\ZZ_q[X]/\langle \bar{\Phi}_m\rangle {\Large\times} \ZZ_q[X]/\langle \bar{\Phi}_m\rangle \right)^{n\log(q)}$<br/>where $\vec{a}_i \xleftarrow{\$} \ZZ_q[X]/\langle \bar{\Phi}_m \rangle$ and $\vec{e}_i \xleftarrow{\bar{\chi}} \ZZ_q[X]/ \langle \bar{\Phi}_m \rangle$ </li></ul> |
| **Encryption**    | <ul><li>Sample $\vec{r} \xleftarrow{\$} \{0, 1\} \subseteq \ZZ^{n\log(q)}$, i.e., a random $n\log(q)$ dimensional vector of $0$s and $1$s</li><li>$\enc(m, \{(\vec{a}_i, \vec{b}_i)\}) := (\vec{c}_0, \vec{c}_1) = \left(\inner{\{\vec{b}_i\}}{\vec{r}}+ m, {-}\inner{\{\vec{a}_i\}}{\vec{r}}\right)$</li></ul> |
| **Decryption**    | <ul><li>$\dec(\vec{s}, (\vec{c}_0, \vec{c}_1)) = \left[[\vec{c}_0 + \vec{c}_1\cdot\vec{s}]\;\text{mod}\; p\right]$</li></ul>|

## Homomorphic Operations

[^BGV]: Z. Brakerski, C. Gentry and V. Vaikuntanathan,
  [(Leveled) Fully homomorphic encryption without bootstrapping](https://ia.cr/2011/277).
  In _Innovations in Theoretical Computer Science_, 2012.

[^Reg05]: O. Regev. [On lattices, learning with errors, random linear
    codes, and
    cryptography](https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.863.6537&rep=rep1&type=pdf).
    In  J. ACM, 56(6):1–40, 2009. Preliminary version in STOC 2005.

[^Reg10]: O. Regev. [The learning with errors
    problem](https://cims.nyu.edu/~regev/papers/lwesurvey.pdf)
    (invited
    survey). In IEEE Conference on Computational Complexity, pages
    191–204. 2010.

[^HS20]: S. Halevi and V. Shoup, [Design and implementation of
    HElib: a homomorphic encryption
    library](https://eprint.iacr.org/2020/1481), In Cryptology
    ePrint Archive, Report 2020/1481, 2020.


[^HS21]: S. Halevi and V. Shoup, [Bootstrapping for
    HElib](https://www.shoup.net/papers/boot.pdf). In Journal of
    Cryptology, Vol. 34, No. 7, 2021.

[^Rot11]: R. Rothblum, [Homomorphic Encryption: From Private-Key to
    Public-Key](https://www.iacr.org/archive/tcc2011/65970216/65970216.pdf).
    In Theory of Cryptography, Page 219--234, 2011.