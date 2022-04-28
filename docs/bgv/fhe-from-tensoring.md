## Introduction

As discussed in [general introduction](../index.md#Introduction),
an FHE scheme consists of (a) a CPA secure (public-key) encryption
scheme, and (b) an evaluation scheme that works directly on
ciphertext.

In LWE and Ring-LWE schemes, the ciphertext $\vec{c}$, corresponding to the
plaintext $p$, usually consists of an ordered pair
$(\vec{a}, b) \in R_q^n\times R_q$, where $b$ is the
result of evaluation of some
[linear functional](https://encyclopediaofmath.org/wiki/Linear_functional)
over $\vec{a}$ and $p$. Here, $R_q$ is usually $\ZZ/q \ZZ$ in case of LWE, or $\ZZ[x]/\langle \Phi_m, q \rangle$ in case of
Ring-LWE. Since $b$ is the result of a linear functional, _additive homomorphism_ between plaintext and ciphertext is often as simple as the
following:

\[
  \text{enc}(\cdot, p_1 + p_2) := (\vec{a_3}, b_3) = (\vec{a_1} + \vec{a_2}, b_1 + b_2) = (\vec{a_1}, b_1) + (\vec{a_2}, b_2)
\]

On the other hand, homomorphism between the multiplication of
plaintext and ciphertext is not that straight forward! After all,
given two vectors, how do you multiply them such that the linear
functional

