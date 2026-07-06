// ロジック

// ref, reactive の初期値
// newLabel
// stats

// add()
// newLabel が有効な場合、stats にオブジェクトが追加されて newLabel がリセットされる
// newLabel が有効な場合、イベントオブジェクトの preventDefault が呼ばれること
// newLabel が無効（空白文字と半角スペース）な場合、stats にオブジェクトが追加されない

// remove()
// stats の長さが 4 以上の場合、指定した添え字のオブジェクトが削除される
// stats の長さが 3 以下の場合、これ以上削除できない警告が出て stats の長さは変わらない
// alert はモックすること


// 描画

// 初期状態
// PolyGraph が描画される
// ラベル・スライダー・スライダーの初期値・削除ボタンが描画される
// 整形済みテキストが描画される

// props
// stub 化した PolyGraph が App.vue から受け取った props（stats）を検証する
// add/remove 後に props が更新されて渡っているか

// イベント
// add クリックイベントが発火すると、新しいスライダーが追加される
// add クリックイベントが発火すると、statsが更新され整形済みテキストも更新される
// remove クリックイベントが発火すると、指定したスライダーが削除される
// remove クリックイベントが発火すると、削除された後に残っている要素が正しいこと
// remove クリックイベントが発火すると、整形済みテキストのリストも更新されること

// スライダーの操作
// スライダー操作後に stat.value の型が文字列ではなく数値になること
// 1. 初期状態で stat.value の型が文字列であることを検証（pass）
// 2. スライダーを操作（stat.value を変更）する
// 3. stat.value の型が数値であることを検証（fail）
// 4. v-model に .number 修飾子（v-model.number="stat.value" ）をつける
// 5. テストを再実行して、3. が pass することを確認

