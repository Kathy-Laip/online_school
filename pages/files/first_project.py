import pandas as pd
import math
import numpy as np
import matplotlib.pyplot as plt


# 1 задание
a = 0
b = 2
k = 5

def generation_points(a, b, n):
    return [(b + a)/ 2 + (b - a) / 2 * np.cos((2 * i + 1)/ (2 * n + 2) * math.pi) for i in range(n)]

def generation_equal(a, b, n):
    return [a + i * (b - a) / n for i in range(0, n+1)]

seg = generation_equal(a, b, k)
 # массив от 0 до 2, пять значений

result = np.array([]) # массив частных сумм
result3 = np.array([])

def a_n(num):
    return 2/math.sqrt(math.pi) * num

def q_n(n, num):
    return ((-num**2) * (2 * n + 1))/((n + 1)*(2 * n + 3))

def amount(num):
    eps = 0.000001 # 10 в -6 степени
    n = 0 
    res = 0

    a = a_n(num) # a0   
    q = q_n(n, num) # q0
    res += a

    member = a * q 
    res += member
    while abs(member) > eps :
        n += 1
        q = q_n(n, num)
        member *= q
        res += member
    
    return res

for i in range(len(seg)):
    result = np.append(result, amount(seg[i]))


print(amount(0.2))
print(amount(0.6))
print(amount(0.8))


# 2 задание
m = 10
seg2 = generation_equal(a, b, m)

for i in range(len(seg2)):
    result3 = np.append(result3, amount(seg2[i]))

print(seg2, result3)

result2 = np.array([])


def pol(x, mas, mas_fi):
    sum = 0
    for i in range(len(mas)):
        ln = 1
        for j in range(len(mas)):
            if(i != j):
                ln *= (x - mas[j])/(mas[i] - mas[j])
        ln *= mas_fi[i]
        sum += ln
    return sum

for i in range(len(seg2)):
    result2 = np.append(result2, pol(seg2[i], seg, result))

ep = []

def get_max_ep(fx, ln):
    return [abs(fx[i]-ln[i]) for i in range(len(fx))]

ep = get_max_ep(result3, result2)

print(ep)

p = pd.DataFrame({
    'X~': seg2,
    'S(X)': result3,
    'Ln(X)': result2,
    'eps': ep
    })
print(p)

plt.plot(seg2, ep)
plt.show()

#3

def nodes(start, finish):
    global a, b
    errors = []
    for i in range(start, finish):
        res1, res2, res3 = [], [], []
        seq = generation_equal(a, b, i)
        seq2 = generation_equal(a, b, i * 2)

        for j in range(len(seq)):
            res1.append(amount(seq[j]))
        for j in range(len(seq2)):
            res2.append(amount(seq2[j]))

        for j in range(len(seq2)):
            res3.append(pol(seq2[j], seq, res1))

        err = max([abs(res2[i]-res3[i]) for i in range(len(res2))])
        errors.append(err)
        print(err)
    return errors

get_errors = nodes(5, 40)
plt.plot([i for i in range(5, 40)], get_errors)
plt.show()
