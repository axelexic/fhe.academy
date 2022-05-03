## Introduction

Almost all Fully Homomorphic Encryption schemes are based on certain hard lattice problems. Since a lattice by definition is a discrete additive subgroup of some ring $R$, the primary algebraic structure over the ciphertext is usually that of an $R$-module. Because of this, there's usually a natural _additive homomorphism_ between plaintext and ciphertext in almost all lattice-based encryption scheme! Finding _multiplicative homomorphism_ on the other hand presents several challenges --- first among them being, "what does it even mean to multiply two elements of an $R$-module?"

Brakersky and Vaikunatanathan in [BV11][^BV11] were the first to devise a novel tensor-product based technique that _does not_ by itself provides multiplicative homomorphism, but with the aid of a technique called relinearization, provides the next best thing: The ability to multiply ciphertexts, although under a different secret key! [BV11][^BV11] is also the first FHE scheme that's based entirely on standard lattice assumptions. (In contrast, Gentry's _first ever_ FHE scheme [Gen09][^Gen09], makes several other computational assumptions about ideal lattice.)

This post describes the algebraic aspects of [BV11] in a simplified setting (namely, Learning _Without_ Errors setting), and the full-fledged application of these ideas are described in [BGV](bgv.md) and [CKKS](ckks.md).

## Additive Homomorphism
The starting point of [BV11] scheme is Regev's [Reg05][^Reg05] bit-by-bit encryption scheme. Recall that in Regev's encryption scheme, the ciphertext corresponding to a plaintext bit $p \in \{0, 1\}$ is of the form $\enc(p) := (\vec{a}, \inner{\vec{a}}{\vec{s}} + e + \ffrac{q}{2}p) \in (\Zmod{q})^n\times \Zmod{q}$, where $\vec{s}$ is the unknown private-key.


!!! note

    Even though the plaintext $p$ can only have values $0$ or $1$,
    because of semantic security, there are _numerous valid
    ciphertexts_ corresponding to the same plaintext $p$. Because of this,
    we will use the notation $\enc(p)$ to mean the _set_ of all possible
    ciphertexts for $p$ and $\vec{c} \in \enc(p)$ to mean one
    concrete value from that entire set.


Suppose $\vec{c}_1 := (\vec{a}_1, b_1) \in \enc(p_1)$ and $\vec{c}_2 := (\vec{a}_2, b_2) \in \enc(p_2)$. The goal of _additive homomorphism_ between the plaintext and ciphertext is to compute a new piece of data $\vec{c}_3 := (\vec{a}_3, b_3)$ as a function of $\vec{c}_1$ and $\vec{c}_2$ such that $\vec{c}_3 \in \enc(p_1 + p_2)$. That is, we want to find a publicly computable function $\eval_+(\cdot, \cdot)$ with the following property:

$$
  \begin{aligned}
  \eval_+ : (\Zmod{q})^{n+1} \times (\Zmod{q})^{n+1} & \longrightarrow (\Zmod{q})^{n+1}\\
  \eval_+(\vec{c}_1, \vec{c}_2) &= \vec{c}_3 \in \enc(p_1 + p_2)
  \end{aligned}
$$

Notice once again that because of semantic security, there are an overwhelming number of ciphertexts of the form $(\vec{a}_3, b_3)$ that will _correctly_ decrypt to $p_1 + p_2$. What is required of $\eval_+(\cdot, \cdot)$ is to find one such representation that is entirely dependent on $\vec{c}_1$ and $\vec{c}_2$ and nothing else (except maybe fresh _public random coins_, if $\eval_+$ is randomized).

Fortunately, because of the bi-linearity of the inner product $\inner{\vec{a}}{\vec{s}}$, finding $\eval_+$ is almost immediate. Since ciphertext of $p_1 + p_2 \in \{0,1\}$ is of the form $\left(\vec{a}_3, \inner{\vec{a}_3}{s} + e_3 + \ffrac{q}{2}(p_1 + p_2)\right),$ if one selects

\[
  \vec{a}_3 := \vec{a}_1 + \vec{a}_2
\]

and

\[
  \begin{aligned}
  b_3 := b_1 + b_2 & = \left (\inner{\vec{a_1}}{\vec{s}} + e_1 + \ffrac{q}{2}p_1 \right) + \left(\inner{\vec{a_2}}{\vec{s}} + e_2 + \ffrac{q}{2}p_2 \right) \\
  & = \left(\inner{\vec{a_1} + \vec{a_2}}{\vec{s}} + (e_1 + e_2) + \ffrac{q}{2}(p_1 + p_2) \right)
  \end{aligned}
\]

then $\vec{c}_3 := (\vec{a}_1 + \vec{a}_2, b_1 + b_2)$ is a valid ciphertext for $p_1 + p_2$ --- provided the noise term $e_1 + e_2$ is not too large. In other words,

$$
\eval_{+}((\vec{a_1},b_1), (\vec{a_2},b_2)) = (\vec{a_1} + \vec{a_1}, b_1 + b2)
$$

suffices!

## Multiplicative Homomorphism
Just like in the case of additive homomorphism, the goal of multiplicative homomorphism is: Given $c_1 := (\vec{a}_1, b_1) \in \enc(p_1)$ and $c_2 := (\vec{a}_2, b_2) \in \enc(p_2)$, compute a piece of data $\vec{c}_3 := (\vec{a}_3, b_2)$ such that $\vec{c}_3 \in \enc(p_1 \cdot p_2)$. In other words, we want to find a publicly computable function $\eval_\times(\cdot, \cdot)$ with the following signature:

$$
  \begin{aligned}
  \eval_\times : (\Zmod{q})^{n+1} \times (\Zmod{q})^{n+1} & \longrightarrow (\Zmod{q})^{n+1}\\
  \eval_\times((\vec{a}_1, b_1), (\vec{a}_2, b_2)) &= (\vec{a}_3, b_3) \in \enc(p_1 \cdot p_2)
  \end{aligned}
$$

where $\vec{a}_1,\vec{a}_2, b_1, b_2$ satisfy the following constraints:

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

In order to compute $\vec{a}_3$ and $b_3$, we first simplify the above constraints and remove the error terms $e_1, e_2,$ and $e_3$, i.e., we are go back to the **completely insecure** world of Learning _Without_ Errors. With the error term gone, message decryption is 100% correct even without the scaling factor $\ffrac{q}{2}$, so we remove that too. Thus, in this setting

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
bit in addition), so _compactness_ demands that $\alpha$ can at
most depend on $\vec{s}$.

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

Recall, that since inner product is a linear functional,

$$
\begin{aligned}
p_1\cdot p_2 &= \inner{\vec{c}_1}{\bar{\vec{s}}}\cdot\inner{\vec{c}_1}{\bar{\vec{s}}} \\
 &= \inner{\vec{c}_1\otimes_{\ZZ}\vec{c}_2} {\bar{\vec{s}}\otimes_{\ZZ} \bar{\vec{s}}}
\end{aligned}
$$

therefore, if $g := \inner{\cdot}{\cdot}$ is the inner product,
$\eval_\times(\vec{c}_1, \vec{c}_2) := \vec{c}_1\otimes\vec{c}_2$
the tensor product of ciphertext, and $\alpha(\vec{s}) :=
\bar{\vec{s}}\otimes \bar{\vec{s}}$ the tensor product of secret key
pre-pended with $1$, then the constraints of
Equation-$\ref{fhe-form-tensors:clean-form}$ are satisfied and
multiplication can be defined on the ciphertext.

To make these ideals concrete, we consider a toy example:

??? "Example $\eval_+, \eval_\times$"

    \( \def\lift{\mathsterling} \)
    Support $p_1 = 1$ and $p_2 = 0$ and we want to compute $\vec{c}_1 = \enc(p_1), \vec{c}_2 = \enc(p_2)$, and homomorphically evaluate $\vec{c}_3 := \vec{c}_1 + \vec{c}_2 = eval_+(\vec{c}_1, \vec{c}_2)$ and $\vec{c}_4 := \vec{c}_1\times \vec{c}_2 = \eval_\times(\vec{c}_1, \vec{c}_2)$.

    We will work in the Ring-LWE settings. Let $R = \mathbb{Z}[Y]/\langle Y^4 + 1\rangle$, $q=7$ and therefore $R_q = \Fq[X]/\langle X^4 + 1\rangle$, where $X$ is the image of $Y$ in $R_q$, i.e., $X = Y\quad\text{mod}\, q$. We will use one-dimensional vectors since we are in the Ring-LWE setting.

    In order to encrypt in the current simplified Regev encryption setting, we randomly chose $\vec{a}_1 := [6X^3+X^2+3X+5]$, $\vec{a}_2 := [X^3+4X^2+3]$ and $\vec{s} := [5X^3+3X^2+2X+1]$, where $\vec{a}_1, \vec{a}_2, \vec{s} \in \left (\F{7}[X]/\langle X^4 + 1 \rangle \right)^1$.

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
      \vec{c}_1 &:= [b_1 \concat -\vec{a}_1] = [-X^2 -3X + 4, X^3-X^2-3X+2] \\
      \vec{c}_2 &:= [b_2 \concat -\vec{a}_2] = [3X^3 + X^2 - 3X + 3, -X^3+3X^2-3]\quad
      \text{and} \\
      \bar{\vec{s}} &:= [ 1 \concat \vec{s}] = [1, -2X^3+3X^2+2X+1]
      \end{aligned}
    $$

    and as a check we can verify that $\inner{\vec{c}_1}{\bar{\vec{s}}} = 1 = p_1 \in R_q$.

    $\mathhdr{\mathbf{\eval_+(\vec{c}_1, \vec{c}_2)}}$

    As discussed before, addition two cipher text is just the addition to two vectors

    $$
    \vec{c}_3 := \eval_+(\vec{c}_1, \vec{c}_2)) = \vec{c}_1 + \vec{c}_2 = [3X^3 + X, 2X^2 - 3X + 6]
    $$

    and we can verify that this decrypts to $p_1 + p_2$ as

    $$
      p_3 := \inner{\vec{c}_3}{\bar{\vec{s}}} = 1 \in R_q
    $$

    $\mathhdr{\mathbf{\eval_\times(\vec{c}_1, \vec{c}_2)}}$

    As discussed before, multiplication is the same as tensor product of $\vec{c}_1$ and $\vec{c}_2$ and the new secret key if the tensor product $\bar{\vec{s}}\otimes \bar{\vec{s}}$, therefore,

    $$
    \begin{aligned}
    \vec{c}_4 &:= \eval_\times(\vec{c}_1,\vec{c}_1) \\
     &= [-X^2 -3X + 4, X^3-X^2-3X+2] \otimes [3X^3 + X^2 - 3X + 3, -X^3+3X^2-3] \\
     &= [(-X^2 -3X + 4)(3X^3 + X^2 - 3X + 3),  (-X^2 -3X + 4)(-X^3+3X^2-3), \\
     &\quad\quad (X^3-X^2-3X+2)(3X^3 + X^2 - 3X + 3), (X^3-X^2-3X+2)(-X^3+3X^2-3)] \\
     &= [5X^3 + 3X^2 + 3X + 1, X^3 + X^2 + X + 2, 2X^3 + 5X^2 + X + 5,  3X^2 + 5X + 1]
    \end{aligned}
    $$

    and the new secret key is

    $$
    \begin{aligned}
      \alpha(\vec{s}) &= \bar{\vec{s}}\otimes\bar{\vec{s}}  \\
      &= [1, 5X^3 + 3X^2 + 2X + 1, 5X^3 + 3X^2 + 2X + 1, X^3 + 6X^2 + 2X]
    \end{aligned}
    $$

    and we can verify that

    $$
      p_1\times p_2 := \inner{\vec{c}_4}{\alpha({\vec{s})}} = 0\quad\quad(\text{try it in SageMath!})
    $$

## Relinearlization

## Noise Management

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