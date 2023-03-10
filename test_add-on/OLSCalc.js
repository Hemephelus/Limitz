/**
 * Returns the coefficients of all the independent variables.
 * 
 * @param {A1:C51} Array The range of cells
 *     to calculate.
 * @param {1} Depdt_Var_Col_Num The value or cell
 *     that would be the dependent variable.
 *
 * @return the coefficients of a the independent variables.
 * @customfunction
 */


function MultipleLinearRegression(Array, Depdt_Var_Col_Num) {
  let arrayColumnY = (Array, Depdt_Var_Col_Num) => Array.map(x => x[Depdt_Var_Col_Num]);
  let TempDeIndpt_Var = arrayColumnY(Array, Depdt_Var_Col_Num)
  let DependentVariable = Transpose_RowToCol([TempDeIndpt_Var])
  let Independent_Var = Indpt_Var(Array, Depdt_Var_Col_Num)
  let Independent_Var_Transpose = Transpose_RowToCol(Independent_Var)
  let Xtranspose_BY_X = Multiplies_TIV_By_IV(Independent_Var_Transpose, Independent_Var)
  let XT_By_X_Inverse = inverse(Xtranspose_BY_X)
  let Xtranspose_BY_Y = Multiplies_TIV_By_IV(Independent_Var_Transpose, DependentVariable)
  let XT_By_Y_Trasposed = Transpose_RowToCol(Xtranspose_BY_Y)
  let Beta_Is = Multiplies_TIV_By_IV(XT_By_X_Inverse, XT_By_Y_Trasposed)

  return Transpose_RowToCol(Beta_Is)
}


function Indpt_Var(Array, Depdt_Var_Col_Num) {

  for (let v = 0; v < Array.length; v++) {

    Array[v].splice(Depdt_Var_Col_Num, 1)

    Array[v].unshift(1)

  }

  return Array
}

function Transpose_RowToCol(Transposing_Array) {

  let Transposed_Array_RToC = []

  for (let g = 0; g < Transposing_Array[0].length; g++) {

    let arrayColumnX = (Transposing_Array, g) => Transposing_Array.map(x => x[g]);
    let DataArrayBeta = arrayColumnX(Transposing_Array, g)
     Transposed_Array_RToC.push(DataArrayBeta)

  }

  return Transposed_Array_RToC

}

function Multiplies_TIV_By_IV(LeftSideMatrix, RightSideMatrix) {

  let SumTIV_By_IV = 0
  let TIV_By_IV = []
  let NewTIV_By_IV = []

  for (let j = 0; j < RightSideMatrix[0].length; j++) {

    for (let i = 0; i < LeftSideMatrix.length; i++) {

      for (let k = 0; k < LeftSideMatrix[0].length; k++) {

        SumTIV_By_IV += LeftSideMatrix[i][k] * RightSideMatrix[k][j]

      }

      TIV_By_IV.push(SumTIV_By_IV)
      SumTIV_By_IV = 0
    }

     NewTIV_By_IV.push(TIV_By_IV)
    TIV_By_IV = []

  }

  return NewTIV_By_IV

}

function IdentityMetrics(nByn) {

  let RowArray = []
  let MainArray = []

  for (let i = 0; i < nByn; i++) {

    for (let j = 0; j < nByn; j++) {

      if (i === j) {

         RowArray.push(1)

      } else {

         RowArray.push(0)

      }

    }

    MainArray.push(RowArray)
    RowArray = []

  }
  return MainArray

}

function InverseMetrixCalculator() {

  if (InversableCheck() !== false) {

    let ResultMTIVBIV = Multiplies_TIV_By_IV(Transpose_RowToCol(Indpt_Var()), Indpt_Var())
    return ResultMTIVBIV

  } else {

    return 'This metrix does not have an Inverse'

  }

}

function InversableCheck() {

  let MTIVBIV = Multiplies_TIV_By_IV(Transpose_RowToCol(Indpt_Var()), Indpt_Var())

  for (let i = 0; i < MTIVBIV.length; i++) {

    let arrayColumnX = (MTIVBIV, i) => MTIVBIV.map(x => x[i]);
    let MTIVBIVithCol = arrayColumnX(MTIVBIV, i)
    let SumMTIVBIVithCol = MTIVBIVithCol.reduce((a, b) => a + b, 0)

    if (SumMTIVBIVithCol === 0) {

      return false

    }

  }

}

function inverse(_A) {

  var temp,
    N = _A.length,
    E = [];

  for (var i = 0; i < N; i++)

    E[i] = [];

  for (i = 0; i < N; i++)

    for (var j = 0; j < N; j++) {

      E[i][j] = 0;
      if (i == j)
        E[i][j] = 1;

    }

  for (var k = 0; k < N; k++) {

    temp = _A[k][k];

    for (var j = 0; j < N; j++) {

      _A[k][j] /= temp;
      E[k][j] /= temp;
    }

    for (var i = k + 1; i < N; i++) {

      temp = _A[i][k];

      for (var j = 0; j < N; j++) {

        _A[i][j] -= _A[k][j] * temp;
        E[i][j] -= E[k][j] * temp;

      }

    }

  }

  for (var k = N - 1; k > 0; k--) {

    for (var i = k - 1; i >= 0; i--) {

      temp = _A[i][k];

      for (var j = 0; j < N; j++) {

        _A[i][j] -= _A[k][j] * temp;
        E[i][j] -= E[k][j] * temp;

      }

    }

  }

  for (var i = 0; i < N; i++)

    for (var j = 0; j < N; j++)

      _A[i][j] = E[i][j];
  return _A;

}
