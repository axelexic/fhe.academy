# Brakerski, Gentry and Vaikuntanathan (BGV) Scheme

## Introduction

Brakerski, Gentry and Vaikuntanathan [BGV][^BGV] scheme is a
_leveled_ fully homomorphic encryption that uses tensor products of
ciphertexts to achieve homomorphic multiplication. This post
describes both the algebraic as well complexity theoretic details
BGV. The reader is assumed to understood the [basics of how tensor
product based FHE scheme](./fhe-from-tensoring.md) works.

## Basic Encryption Scheme
The basic encryption scheme in [BGV] is based on Regev's public-key
encryption.

!!! important "Explicit Base Change and Lifts"

    In the literature, it's a common practice to do implicit base change
    from on ring to another without, say
    $\Zmod{q}$ to $\ZZ$, for certain operations such as comparison of
    two elements of $\Zmod{q}$ (which is not defined). We avoid this
    practice at the cost of some verbosity. In the interest of clarity
    and correctness guarantees, we would also like to  encourage the
    LWE/R-LWE research community to be very explicit about base change.

[^BGV]: Z. Brakerski, C. Gentry and V. Vaikuntanathan,
  [(Leveled) Fully homomorphic encryption without bootstrapping](https://ia.cr/2011/277).
  In _Innovations in Theoretical Computer Science_, 2012.
