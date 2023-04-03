from sklearn.datasets import fetch_california_housing
import random
import numpy as np
import matplotlib.pyplot as plt

# gradient
def gradient(w, t, F, reg_coef):
    I = np.eye(len(F.T))
    return - (t.T @ F).T + (w.T @ (F.T @ F + reg_coef * I.T)).T

# gradient descent
def gradient_descent(w_i, w_i_1, epsilon, x_train,reg_coef):
    err_col, iter_col = [], []
    i = 0
    while True:
        if np.linalg.norm(w_i - w_i_1) < epsilon or np.linalg.norm(gradient(w_i_1, t_train, x_train, reg_coef)) < epsilon or i > 40000:
            break
        w_i_1 = w_i
        w_i = w_i_1 - learning_rate * gradient(w_i_1, t_train, x_train, reg_coef)

        error = error_regularization(0.0001, x_train, t_train, w_i)

        err_col.append(error)
        iter_col.append(i)

        i += 1

    return err_col, iter_col, w_i

# Design Matrix
def design_matrix(x, M, func):
    design_mtrx = []

    for i in range(M + 1):
        design_mtrx.append(np.power(func(x), i))

    design_mtrx = np.array(design_mtrx).T

    return design_mtrx

# Regularization Error
def error_regularization(la, F, t, w):
    y = F @ w.T
    return (1 / len(t)) * (np.sum(np.power((t - y), 2)) + la * (w @ w.T))


# Разделение выборки
def random_generating_parts(x, N):
    x_part = []

    for i in range(int(N)):
        rand = random.randint(0, len(x) - 1)
        x_part = np.column_stack((x_part, x[rand]))
        x = np.delete(x, rand)

    return x, x_part

#---------------
# ZONE: Training part
#---------------

#region ZONE: Training part

# 1. Parts' initialization
def init_part(N, x, t):
    x_part = []
    t_part = []

    for i in range(int(N)):
        index = random.randint(0, len(x) - 1)
        row = np.reshape(x[index], (1, 8))
        if i == 0:
            x_part = row
            t_part.append(t[index])
        else:
            x_part = np.concatenate([x_part, row], axis=0)
            t_part.append(t[index])

        x = np.delete(x, index, axis=0)

    return x_part, x, np.array(t_part)

def train_part(x_train, reg_coef):

    # Начальное приближение со случайными значениями из нормального распределения
    w0 = np.random.normal(0, 0.1, x_train.shape[1])
    w_i, w_i_1 = w0 - learning_rate * gradient(w0, t_train, x_train, reg_coef), w0

    # Градиентный спуск
    err_col, iter_col, w_i = gradient_descent(w_i, w_i_1, epsilon, x_train, reg_coef)

    # График зависимости ошибки от номера итерации
    plt.plot(iter_col, err_col, color='green')
    print('Train Error: ', min(err_col))

    return w_i

# 2. Нормализация
def normalization(x):
    for i in range(len(x.T)):
        x[:, i] = (x[:, i] - x[:, i].min()) / (x[:, i].max() - x[:, i].min())
    return x


# Градиентный спуск


# Base function: выбрать самим

# Regularization coef: выбрать самим



#endregion

#---------------
# ZONE: Test part
#---------------

#region ZONE: Test part

def test_part(x_test, t_test, w_i, la):
    print('Test Error: ', error_regularization(la, x_test, t_test, w_i))

#endregion



# ZONE: MAIN
if __name__ == '__main__':

    #region ZONE: Input Data
    learning_rate = 0.0001
    epsilon = 0.001
    la = 0.0001
    #region NOT_USED: Functions
    # func_x = lambda x: x
    # func_sin = lambda x: np.sin(x)
    # func_cos = lambda x: np.cos(x)
    # func_exp = lambda x: np.exp(x)
    # func_sqrt = lambda x: np.sqrt(x)
    #
    # functions = [func_x, func_sin, func_cos, func_exp, func_sqrt]
    # functions_names = ['x', 'sin', 'cos', 'exp', 'sqrt']
    #endregion

    # x, t Data
    x, t = fetch_california_housing(return_X_y=True)
    t_copy = t

    #endregion

    # region ZONE: Regression solving (Gradient)

    # 1. Разделение датасета на обучающую и тестовую выборки
    x_train, x, t_train = init_part(len(x)*0.8, x, t_copy)
    x_test, x, t_test = init_part(len(x), x, t_copy)

    # 2. Нормализация
    x_train = normalization(x_train)
    x_test = normalization(x_test)

    # 3. Обучение модели с помощью градиентного спуска
    w_i = train_part(x_train, la)

    # 4. Ошибка на тестовой выборки
    test_part(x_test, t_test, w_i, la)

    plt.show()

    #endregion





