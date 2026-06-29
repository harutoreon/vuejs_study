// レーダーチャート（蜘蛛の巣グラフ）の頂点座標を計算する関数
// 値を真上方向のベクトルとして定義し、角度分だけ回転させてSVGの座標系に変換する

// 関数の目的
// value（データの値）を、レーダーチャート上のXY座標に変換する

// 引数
// value・・・データの値（例：80点や60点など）
// index・・・項目の番号（0始まり）
// total・・・項目の総数（軸の本数）

export function valueToPoint(value, index, total) {
  // ①　原点からの仮の座標を定義
  const x = 0
  const y = -value * 0.8

  // ②　回転角度を計算
  const angle = ((Math.PI * 2) / total) * index

  // ③　2D回転行列を適用
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  const tx = x * cos - y * sin + 100
  const ty = x * sin + y * cos + 100

  // ④　値の返却
  return {
    x: tx,
    y: ty
  }
}
