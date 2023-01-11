# Leveled Homomorphic Encryption from Tensor Products
## Introduction

Almost all Fully Homomorphic Encryption schemes are based on certain
hard lattice problems. Since a lattice by definition is a discrete
additive subgroup of some ring $R$, the primary algebraic structure
over which the ciphertext is usually defined is that of an
[$R$-module](https://en.wikipedia.org/wiki/Module_(mathematics)).
Because of this, there's usually a natural _additive homomorphism_
between the plaintext and the ciphertext! Finding a _multiplicative
homomorphism_, on the other hand, presents several challenges ---
starting from: "What does it even mean to multiply two elements of
an $R$-module?"

Brakersky and Vaikunatanathan in [BV11][^BV11] were the first to
devise a novel tensor-product based technique that _does not_ by
itself provides multiplicative homomorphism, but with the aid of a
technique called relinearization, provides the next best thing: The
ability to multiply ciphertexts, although under a different secret
key! [BV11][^BV11] is also the first FHE scheme that's based
entirely on standard lattice assumptions. (In contrast, Gentry's
_first ever_ FHE scheme [Gen09][^Gen09], makes several other
computational assumptions about ideal lattice.)

This post describes the algebraic aspects of [BV11] in a simplified
setting (namely, Learning _Without_ Errors setting), and the
full-fledged application of these ideas are described in
[BGV](bgv.md) and [CKKS](ckks.md).

## Additive Homomorphism
The starting point of [BV11] scheme is Regev's [Reg05][^Reg05]
bit-by-bit encryption scheme. Recall that in Regev's encryption
scheme, the ciphertext corresponding to a plaintext bit $p \in \{0,
1\}$ is of the form $\enc(p) := (\vec{a}, \inner{\vec{a}}{\vec{s}} +
e + \ffrac{q}{2}p) \in (\Zmod{q})^n\times \Zmod{q}$, where $\vec{s}$
is the unknown private-key.


!!! info

    **Notation**: Even though in this setting, the plaintext $p$ can only have
    values $0$ or $1$, the ciphertext has _numerous valid values_
    corresponding to the same plaintext $p$. This is essential to
    ensure semantic security. Because of this, we will use the
    notation $\enc(p)$ to mean the _set_ of all possible ciphertexts
    corresponding to the plaintext $p$ and $\vec{c} \in \enc(p)$
    to mean one concrete value from that entire set.


Let $\vec{c}_1 := (\vec{a}_1, b_1) \in \enc(p_1)$ and $\vec{c}_2
:= (\vec{a}_2, b_2) \in \enc(p_2)$. The goal of _additive
homomorphism_ between the plaintext and ciphertext is to compute a
new piece of data $\vec{c}_3 := (\vec{a}_3, b_3)$ as a function of
$\vec{c}_1$ and $\vec{c}_2$ such that $\vec{c}_3 \in \enc(p_1 +
p_2)$. That is, we want to find a publicly computable function
$\eval_+(\cdot, \cdot)$ with the following property:

$$
  \begin{aligned}
  \eval_+ : (\Zmod{q})^{n+1} \times (\Zmod{q})^{n+1} & \longrightarrow (\Zmod{q})^{n+1}\\
  \eval_+(\vec{c}_1, \vec{c}_2) &= \vec{c}_3 \in \enc(p_1 + p_2)
  \end{aligned}
$$

Notice that because of semantic security, there are an overwhelming
number of ciphertexts of the form $(\vec{a}_3, b_3)$ that will
_correctly_ decrypt to $p_1 + p_2$. What is required of
$\eval_+(\cdot, \cdot)$ is to find one such representation that is
entirely dependent on $\vec{c}_1$ and $\vec{c}_2$ and nothing else
(except, possibly fresh adversary controlled _random coins_, and/or
the user's public key).

Fortunately, because of the bi-linearity of the inner product
$\inner{\vec{a}}{\vec{s}}$, finding $\eval_+$ is almost immediate.
Since ciphertext of $p_1 + p_2 \in \{0,1\}$ is of the form
$\left(\vec{a}_3, \inner{\vec{a}_3}{s} + e_3 + \ffrac{q}{2}(p_1 +
p_2)\right),$ if one selects

\[
  \vec{a}_3 := \vec{a}_1 + \vec{a}_2
\]

and

\[ \begin{aligned} b_3 := b_1 + b_2 & = \left
  (\inner{\vec{a_1}}{\vec{s}} + e_1 + \ffrac{q}{2}p_1 \right) +
  \left(\inner{\vec{a_2}}{\vec{s}} + e_2 + \ffrac{q}{2}p_2 \right)
  \\
  & = \left(\inner{\vec{a_1} + \vec{a_2}}{\vec{s}} + (e_1 + e_2) +
  \ffrac{q}{2}(p_1 + p_2) \right) \end{aligned} \]

then $\vec{c}_3 := (\vec{a}_1 + \vec{a}_2, b_1 + b_2)$ is a valid
ciphertext for $p_1 + p_2$ --- provided the noise term $e_1 + e_2$
is not too large. In other words,

$$ \eval_{+}((\vec{a_1},b_1), (\vec{a_2},b_2)) = (\vec{a_1} +
\vec{a_2}, b_1 + b2) $$

suffices!

## Multiplicative Homomorphism
Just like in the case of additive homomorphism, the goal of
multiplicative homomorphism is: Given $c_1 := (\vec{a}_1, b_1) \in
\enc(p_1)$ and $c_2 := (\vec{a}_2, b_2) \in \enc(p_2)$, find a
piece of data $\vec{c}_3 := (\vec{a}_3, b_2)$ such that $\vec{c}_3
\in \enc(p_1 \cdot p_2)$. In other words, we want to find a publicly
computable function $\eval_\times(\cdot, \cdot)$ with the following
signature:

$$ \begin{aligned} \eval_\times : (\Zmod{q})^{n+1} \times
  (\Zmod{q})^{n+1} & \longrightarrow (\Zmod{q})^{n+1}\\
  \eval_\times((\vec{a}_1, b_1), (\vec{a}_2, b_2)) &= (\vec{a}_3,
  b_3) \in \enc(p_1 \cdot p_2) \end{aligned} $$

where $\vec{a}_1,\vec{a}_2, b_1, b_2$ satisfy the following
constraints:

$$
\begin{aligned}
b_1 &= \inner{\vec{a}_1}{\vec{s}} + e_1 + \ffrac{q}{2}p_1 \\
b_2 &= \inner{\vec{a}_2}{\vec{s}} + e_2 + \ffrac{q}{2}p_2 \\
\end{aligned}
$$

and $\vec{a}_3, b_3$, need to satisfy the constraint:

$$
\begin{aligned}
b_3 &= \inner{\vec{a}_3}{\vec{s}} + e_3 + \ffrac{q}{2}(p_1\cdot p_2) \\
\end{aligned}
$$

In order to compute $\vec{a}_3$ and $b_3$, we first simplify the
above constraints and remove the error terms $e_1, e_2,$ and $e_3$,
i.e., we are go back to the **completely insecure** world of
Learning _Without_ Errors. With the error term gone, message
decryption is 100% correct even without the scaling factor
$\ffrac{q}{2}$, so we remove that too. Thus, in this setting

\[
\enc(p) = \inner{\vec{a}}{\vec{s}} + p.
\]

and $\vec{a}_1,\vec{a}_2, b_1, b_2$ satisfy:

$$
\begin{aligned}
p_1 &= b_1 - \mcbox{\inner{\vec{a}_1}{\vec{s}}} \\
p_2 &= b_2 - \mcbox{\inner{\vec{a}_2}{\vec{s}}}   \\
\end{aligned}
$$

where the value of entires in the color box are not known. For
$\eval_\times$ to exist and the resulting ciphertext to remain
_decryptable_, its crucial that $p_1\cdot p_2$ can be written in a
form such that the secret-key and the ciphertext are not
"intertwined," i.e., $p_1\cdot p_2$ must be express-able as

$$
  \begin{equation}
p_1\cdot p_2 = g(\eval_\times(\vec{a}_1,\vec{a}_2, b_1, b_2),
\mcbox{\alpha(\vec{s})}).
  \label{fhe-form-tensors:clean-form}
  \end{equation}
$$

This is because, $\eval_\times$ does not have access to $\vec{s}$,
so cannot depend on it. On the other hand, $\alpha(\cdot)$ cannot
depend on the ciphertext (i.e., $\vec{a}_1, \vec{a}_2, b_1, b_2$)
because $\vec{a}_1, \vec{a}_2, b_1, b_2$ might be an intermediate
value that never makes it directly to the output (e.g., the carry
bit in addition), so _compactness_ demands that $\alpha$ can at most
depend on $\vec{s}$.

In the present case, then

$$
\begin{aligned}
p_1\cdot p_2 &= (b_1 - \inner{\vec{a}_1}{\vec{s}})\times (b_2 -
\inner{\vec{a}_2}{\vec{s}}) &  \\
             &= \left (\inner{b_1 \concat 0..0 }{1 \concat \vec{s}} -
                       \inner{0 \concat {\vec{a}_1}}{1 \concat \vec{s}}
                \right ) \\
             &\quad\quad\times \left ( \inner{b_2 \concat 0..0}{1 \concat \vec{s}} -
                                       \inner{0 \concat {\vec{a}_2}}{1 \concat \vec{s}}
                                \right ) & \\
             &= \inner{b_1 \concat 0..0 - 0 \concat {\vec{a}_1}}{1 \concat \vec{s}}
                \inner{b_2 \concat 0..0 - 0 \concat {\vec{a}_2}}{1 \concat \vec{s}} & (\text{bi-linearity})\\
             &= \inner{b_1 \concat {-\vec{a}_1}}{1 \concat \vec{s}}
                \inner{b_2 \concat {-\vec{a}_2}}{1 \concat \vec{s}} & \\
\end{aligned}
$$

where $\concat$ means concatenation and $0..0$ represents a vector
of as many zeros as needed to fulfil dimension requirements. If we
write $\vec{c}_i = b_i \concat {-\vec{a_i}}$ and $\bar{\vec{s}} =
1\concat \vec{s}$, then $p_1\cdot p_2 =
\inner{\vec{c}_1}{\bar{\vec{s}}} \cdot
\inner{\vec{c}_2}{\bar{\vec{s}}}$. Question is, can $p_1\cdot p_2$
be written in the form of $g(\eval_\times(\vec{a}_1,\vec{a}_2, b_1,
b_2), \alpha({\vec{s})})$ satisfying the requirements described in
Equation-$\ref{fhe-form-tensors:clean-form}$? Thanks to the
bi-linearity of inner product and [universal mapping
property](https://kconrad.math.uconn.edu/blurbs/linmultialg/tensorprod.pdf)
of tensor products, the answer is yes!

!!! info

    $\bar{\vec{s}} := 1 \concat \vec{s}$ is called the
    _normalized secret-key_ and $\vec{c} := b_i \concat
    {-\vec{a_i}}$ is called _normalized ciphertext_.

Recall, that since inner product is a linear functional,

$$
\begin{aligned}
p_1\cdot p_2 &= \inner{\vec{c}_1}{\bar{\vec{s}}}\cdot\inner{\vec{c}_1}{\bar{\vec{s}}} \\
 &= \inner{\vec{c}_1\otimes_{R_q}\vec{c}_2} {\bar{\vec{s}}\otimes_{R_q} \bar{\vec{s}}}
\end{aligned}
$$

therefore, if $g$ is defined as the inner product, $\eval_\times$
defined as the tensor product of ciphertext, and $\alpha(\vec{s})$
defined as the tensor product of secret-key prepended with $1$,
then the constraints of Equation-$\ref{fhe-form-tensors:clean-form}$
are satisfied making homomorphic multiplication feasible.

To make these ideas concrete, we consider a toy example:

??? example "Example: $\eval_+, \eval_\times$"

    Support $p_1 = 1$ and $p_2 = 0$ and we want to compute $\vec{c}_1 = \enc(p_1), \vec{c}_2 = \enc(p_2)$, and homomorphically evaluate $\vec{c}_3 := \vec{c}_1 + \vec{c}_2 = \eval_+(\vec{c}_1, \vec{c}_2)$ and $\vec{c}_4 := \vec{c}_1\times \vec{c}_2 = \eval_\times(\vec{c}_1, \vec{c}_2)$.

    We will work in the Ring-LWE settings. Let $R = \mathbb{Z}[Y]/\langle Y^4 + 1\rangle$, $q=7$ and therefore $R_q = \Fq[X]/\langle X^4 + 1\rangle$, where $X$ is the image of $Y$ in $R_q$, i.e., $X = Y\quad\text{mod}\, q$. We will use one-dimensional vectors since we are in the Ring-LWE setting.

    In order to encrypt in the current simplified Regev encryption setting, we randomly chose $\vec{a}_1 := \begin{pmatrix}6X^3+X^2+3X+5 \end{pmatrix}$, $\vec{a}_2 := \begin{pmatrix} X^3+4X^2+3 \end{pmatrix}$ and $\vec{s} := \begin{pmatrix}5X^3+3X^2+2X+1 \end{pmatrix}$, where $\vec{a}_1, \vec{a}_2, \vec{s} \in \left (\F{7}[X]/\langle X^4 + 1 \rangle \right)^1$.

    To compute cipher text, we first compute, $b_i$s as

    $$
    \begin{aligned}
    b_1 &= \inner{\vec{a}_1}{\vec{s}} + p1 \\
              &= -X^2 -3X + 4,\; \text{and} \\
    b_2 &= \inner{\vec{a}_2}{\vec{s}} + p2 \\
              &= 3X^3 + X^2 - 3X + 3\\
    \end{aligned}
    $$

    Therefore the ciphertexts are

    $$
      \begin{aligned}
      \vec{c}_1 &:= [b_1 \concat -\vec{a}_1] = \begin{pmatrix}-X^2 -3X + 4 \\ X^3-X^2-3X+2 \end{pmatrix} \\
      \vec{c}_2 &:= [b_2 \concat -\vec{a}_2] = \begin{pmatrix}3X^3 + X^2 - 3X + 3 \\ -X^3+3X^2-3\end{pmatrix}\quad
      \text{and} \\
      \bar{\vec{s}} &:= [ 1 \concat \vec{s}] = \begin{pmatrix}1 \\ -2X^3+3X^2+2X+1 \end{pmatrix}
      \end{aligned}
    $$

    and as a check we can verify that $\inner{\vec{c}_1}{\bar{\vec{s}}} = 1 = p_1 \in R_q$.

    $\mathhdr{\mathbf{\eval_+(\vec{c}_1, \vec{c}_2)}}$

    As discussed before, addition two cipher text is just the addition to two vectors

    $$
    \vec{c}_3 := \eval_+(\vec{c}_1, \vec{c}_2) = \vec{c}_1 + \vec{c}_2 = \begin{pmatrix}3X^3 + X \\ 2X^2 - 3X + 6 \end{pmatrix}
    $$

    and we can verify that this decrypts to $p_1 + p_2$ as

    $$
      p_3 := \inner{\vec{c}_3}{\bar{\vec{s}}} = 1 \in R_q
    $$

    $\mathhdr{\mathbf{\eval_\times(\vec{c}_1, \vec{c}_2)}}$

    As discussed before, multiplication is the same as tensor product of $\vec{c}_1$ and $\vec{c}_2$ and the new secret-key if the tensor product $\bar{\vec{s}}\otimes \bar{\vec{s}}$, therefore,

    $$
    \begin{aligned}
    \vec{c}_4 &:= \eval_\times(\vec{c}_1,\vec{c}_1) \\
     &= \begin{pmatrix}-X^2 -3X + 4 \\ X^3-X^2-3X+2 \end{pmatrix} \otimes \begin{pmatrix} 3X^3 + X^2 - 3X + 3 \\ -X^3+3X^2-3 \end{pmatrix} \\
     &= \begin{pmatrix}(-X^2 -3X + 4)(3X^3 + X^2 - 3X + 3) \\  (-X^2 -3X + 4)(-X^3+3X^2-3) \\ (X^3-X^2-3X+2)(3X^3 + X^2 - 3X + 3) \\ (X^3-X^2-3X+2)(-X^3+3X^2-3) \end{pmatrix} \\
     &= \begin{pmatrix} 5X^3 + 3X^2 + 3X + 1 \\ X^3 + X^2 + X + 2 \\ 2X^3 + 5X^2 + X + 5 \\  3X^2 + 5X + 1 \end{pmatrix}
    \end{aligned}
    $$

    and the new secret-key is

    $$
    \begin{aligned}
      \alpha(\vec{s}) &= \bar{\vec{s}}\otimes\bar{\vec{s}}  \\
      &= \begin{pmatrix}1 \\ 5X^3 + 3X^2 + 2X + 1 \\ 5X^3 + 3X^2 + 2X + 1 \\ X^3 + 6X^2 + 2X \end{pmatrix}
    \end{aligned}
    $$

    and we can verify that

    $$
      p_1\times p_2 := \inner{\vec{c}_4}{\alpha({\vec{s})}} = 0\quad\quad(\text{check in SageMath!})
    $$

As the example above demonstrates, the (almost trivial) algebra
works! But there are two problems with the scheme:

1. After every multiplication, the secret-key needed to decrypt the
   product ciphertext changes to $\bar{\vec{s}} \otimes
   \bar{\vec{s}}$. Furthermore, the dimension of ciphertext squares
   after each homomorphic multiplication, and
2. The scheme is completely insecure in the current Learning
   _Without_ Errors setting, but it's unclear how adding noise will
   interferes with tensor-product of ciphertexts. For example, if
   the tensor product amplifies the noise in such a way that
   $p_1\cdot p_2$ cannot be "decoded," then the scheme will be
   useless.

[BV11][^BV11] family of homomorphic schemes deal with the issue of
dimension explosion using a technique called _relinearization_,
which we discuss in the next section. The issue of noise management
is described in individual FHE schemes as it requires exact details
about the actual encryption scheme.


## Relinearization

We continue the discussion in the Learning _Without_ Errors
settings. In the present encryption scheme, the plaintext is the
inner-product between the ciphertext and the secret-key i.e., $p =
\inner{\vec{c}}{\bar{\vec{s}}}$. That means, if $\vec{c}$ and
$\bar{\vec{s}}$ are transformed to $\sigma(\vec{c})$ and
$\tau(\bar{\vec{s}})$, such that $\inner{\vec{c}}{\bar{\vec{s}}} =
\inner{\sigma(\vec{c})}{\tau(\bar{\vec{s}})}$, then
$\sigma(\vec{c})$ will be a valid ciphertext corresponding to the
new key $\tau(\bar{\vec{s}})$.

The general strategy to transform the cipher text of dimension $n$
to $m$ is as follows:

1. First, sample a new secret-key $\vec{t} \in R_q^{m}$ uniformly
   (and independently--if circular security [BRS02][^BRS02] [BHHO08][^BHHO08] bothers
   you) at random and use this new key to publish "encryptions" of
   each component of the old key $\vec{s}$.

2. Use the encryptions of the old key and the old ciphertext to
   generate a ciphertext that preserves the inner-product invariant.

Now in detail: Suppose $\bar{\vec{s}} = \begin{bmatrix} 1 & s_1 &
\cdots & s_n \end{bmatrix} \in R_q^{n+1}$ is the normalized secret
key and $\vec{c} \in R_q^{n+1}$ is the corresponding ciphertext. Let
$\vec{t} \in R_q^m$ be the new raw secret-key (i.e., $\vec{t}$ does
not have $1$ concatenated to it). Then the first pre-processing step
(which must be carried out at the time of key-generation) is to
compute encryptions of $s_i$ using the new key $\vec{t} \in R_q^m$,
i.e., compute $n+1$ ciphertexts

$$
  \begin{aligned}
  \psi_0 &= \inner{\vec{d}_0}{\vec{t}} + 1   \\
  \psi_1 &= \inner{\vec{d}_1}{\vec{t}} + s_1 \\
  \psi_2 &= \inner{\vec{d}_2}{\vec{t}} + s_2 \\
  &\cdots \\
  \psi_n &= \inner{\vec{d}_n}{\vec{t}} + s_n \\
  \end{aligned}
$$

where $\vec{d}_i \in R_q^{m}$. These $n+1$ ciphertexts and the
corresponding $\vec{d}_i$s can be represented as normalized
ciphertexts in an $(n+1) \times (m+1)$ matrix $\mathbf{B}$ called
relinearization matrix:

$$
  \mathbf{B} := \begin{pmatrix}
    \psi_0 \concat {-\vec{d}_0} \\
    \psi_1 \concat {-\vec{d}_1} \\
    \psi_2 \concat {-\vec{d}_2} \\
    \cdots \\
    \psi_n \concat {-\vec{d}_n} \\
  \end{pmatrix} \in R_q^{(n+1)\times (m+1)}.
$$

One can verify that

$$
\begin{equation}
\begin{aligned}
\bar{\vec{s}} &= \mathbf{B}\cdot \bar{\vec{t}}
\end{aligned}
\label{fhe-form-tensors:key-transformation}
\end{equation}
$$

Assuming all vectors are represented as column vectors, for the
ciphertext $\vec{c}$, encrypted under secret-key $\bar{\vec{s}}$,
the following holds:

$$
  \begin{aligned}
  p = \inner{\vec{c}}{\bar{\vec{s}}} &= \inner{\vec{c}}{\mathbf{B}\cdot
  \bar{\vec{t}}} & (\text{by}\;\ref{fhe-form-tensors:key-transformation})\\
  &= \inner{\mathbf{B}^T\cdot \vec{c}}{\bar{\vec{t}}} & (\text{by bi-linearity})
  \end{aligned}
$$

Therefore, $\mathbf{B}^T\cdot \vec{c}$ is a valid ciphertext for $p$
albeit encrypted under a different secret-key $\bar{\vec{t}}$.
Therefore, $\sigma_{\bar{\vec{t}}}(\vec{c}) = \mathbf{B}^T\cdot\vec{c}$.

In the context of multiplication, relinearization is an extremely
useful technique to reduce the dimension of $\vec{c}_1\otimes
\vec{c}_2$ from $n^2$ to $n$ (or any other value). We demonstrate
this with an example.

??? example "Example: Relinearization after $\eval_\times$"

    We continue with the previous example and try to relinearize
    the ciphertext corresponding to $p_1\cdot p_2$, where:

    $$
      \begin{aligned}
      \bar{\vec{s}} &:= \begin{pmatrix} 1 \\ -2X^3 + 3X^2 + 2X + 1 \end{pmatrix} \\
      \bar{\vec{s}}\otimes \bar{\vec{s}} &:= \begin{pmatrix} 1 \\ 5X^3 + 3X^2 + 2X + 1\\ 5X^3 + 3X^2 + 2X + 1\\ X^3 + 6X^2 + 2X \end{pmatrix} \\
      \enc(p_1\cdot p_2) = \vec{c}_1\otimes \vec{c}_2 &:= \begin{pmatrix} 5X^3 + 3X^2 + 3X + 1 \\ X^3 + X^2 + X + 2 \\ 2X^3 + 5X^2 + X + 5 \\  3X^2 + 5X + 1 \end{pmatrix} \\
      \end{aligned}
    $$

    We would like to bring down the dimension of the ciphertext to
    just one Ring-LWE sample (i.e.,
    $\text{dim}(\sigma(\vec{c}_1\otimes \vec{c}_1)) = 2$ ). To do
    that we generate a new random key $\vec{t}$ and compute the
    relinearization matrix $\mathbf{B}$.

    $\mathhdr{\text{Preprocessing}\; \bar{\vec{s}}\otimes
    \bar{\vec{s}}}$

    Let $\bar{\vec{t}} := \begin{pmatrix}1 & 4X^3+2X+5 \end{pmatrix}^T$ be the new random secret-key.
    We randomly generate

    $$
    \begin{pmatrix}
      d_0 \\
      d_1 \\
      d_2 \\
      d_3
    \end{pmatrix} :=
    \begin{pmatrix} 5X^3 + 5X^2 + 2X + 3 \\
      6X^3 + 2X + 4 \\
      4X^3 + 3X^2 + 5X + 5 \\
       3X^3 + 6X^2 + 3X + 2
    \end{pmatrix}
    $$

    and compute the relinearization matrix as

    $$
      \mathbf{B} =
      \begin{pmatrix}
        \psi_0 & -d_0 \\
        \psi_1 & -d_1 \\
        \psi_2 & -d_2 \\
        \psi_3 & -d_3 \\
      \end{pmatrix} =
      \begin{pmatrix}
        5X^3 + 2X^2 + 3X + 5    & -(5X^3 + 5X^2 + 2X + 3) \\
        2X^3 + 4X^2 + 6X + 1    & -(6X^3 + 2X + 4) \\
        2X^3 + 5X^2 + 4X + 5    & -(4X^3 + 3X^2 + 5X + 5) \\
        X^3 + 2X^2 + 4X + 6     & -(3X^3 + 6X^2 + 3X + 2)
      \end{pmatrix}
    $$

    Then the new ciphertext for $p_1 \cdot p_2$ will be

    $$
      \begin{aligned}
            \sigma(\vec{c}_4) &=
              \begin{pmatrix}
        5X^3 + 2X^2 + 3X + 5    & -(5X^3 + 5X^2 + 2X + 3) \\
        2X^3 + 4X^2 + 6X + 1    & -(6X^3 + 2X + 4) \\
        2X^3 + 5X^2 + 4X + 5    & -(4X^3 + 3X^2 + 5X + 5) \\
        X^3 + 2X^2 + 4X + 6     & -(3X^3 + 6X^2 + 3X + 2)
      \end{pmatrix}^T \cdot \begin{pmatrix} 5X^3 + 3X^2 + 3X + 1 \\
                             X^3 + X^2 + X + 2    \\
                             2X^3 + 5X^2 + X + 5  \\
                             3X^2 + 5X + 1
              \end{pmatrix} \\
       &= \begin{pmatrix}
              2X^{3} + 6X^{2} + X \\ 2X^{3} + 4X^{2} + 5X + 2\\
          \end{pmatrix}
      \end{aligned}
    $$

    and

    $$
    \begin{aligned}
      p_1\cdot p_2 &\stackrel{?}{=} \inner{\sigma(\vec{c}_4)}{\bar{\vec{t}}}\\
      &= \left \langle \begin{pmatrix} 2X^{3} + 6X^{2} + X \\ 2X^{3} + 4X^{2} + 5X + 2\end{pmatrix}, \begin{pmatrix} 1 \\ 4X^3+2X+5\end{pmatrix}\right \rangle& \\
      &=  0 & (\text{check with SageMath!})
    \end{aligned}
    $$

    as expected.




## References
[^BV11]: Z. Brakerski and V. Vaikuntanathan, [Efficient Fully
Homomorphic Encryption from (Standard) LWE
](https://eprint.iacr.org/2011/344.pdf). In 2011 IEEE 52nd Annual
Symposium on Foundations of Computer Science, 2011, pp. 97-106, doi:
10.1109/FOCS.2011.12.

[^Gen09]: C. Gentry, [Fully homomorphic encryption using ideal
    lattices](https://www.cs.cmu.edu/~odonnell/hits09/gentry-homomorphic-encryption.pdf).
    In the Proceedings of the 41st ACM Symposium on Theory of
    Computing – STOC 2009, pp. 169–178. ACM, New York (2009)

[^Reg05]: O. Regev, [On lattices, learning with errors, random
    linear codes, and
    cryptography](https://cims.nyu.edu/~regev/papers/lwesurvey.pdf).
    In Proceedings of the 37th Annual ACM Symposium on Theory of
    Computing, Baltimore, MD, USA, May 22-24, 2005. pp. 84–93.

[^BRS02]: J. Black, P. Rogaway and T. Shrimpton, [Encryption-Scheme
    Security in the Presence of Key-Dependent
    Messages](https://eprint.iacr.org/2002/100). In SAC 2002:
    Revised papers from the 9th Annual International Workshop on
    Selected Areas in Cryptography, August 2002, Pages 62–75.

[^BHHO08]: D. Boneh, S. Halevi, M. Hamburg, and R. Ostrovsky.
  [Circular-secure encryption from decision
  Diffie-Hellman](https://web.cs.ucla.edu/~rafail/PUBLIC/97.pdf). In
  CRYPTO, pages 108–125, 2008.