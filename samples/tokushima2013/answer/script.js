// 変数定義
// canvas要素と、キャンバスコンテキストを格納する

var canvasElem = $("canvas")[0]; // canvas要素
var context = canvasElem.getContext('2d'); // キャンバスのコンテキストを取得する

// STEP1

// "スナップ" ボタンをクリックしたら、snap_pictureが呼ばれる
$("#snap-button").on("click", snap_picture);

// スナップ写真を撮る
function snap_picture() {
  // ビデオのスナップショットをキャンバスに貼る
  context.drawImage($("video")[0], 0, 0);
}


// STEP2

// "枠線を描く" ボタンをクリックしたら、draw_wakuが呼ばれる
$("#waku-button").on("click", draw_waku);

// 枠線を描く関数
function draw_waku() {
  context.beginPath(); // 描画を開始する
  context.strokeStyle = "yellow"; // 枠線の色を黄色に指定
  context.lineWidth = 25; // 枠線の太さを 25 pixelにする
  context.strokeRect(0, 0, canvasElem.width, canvasElem.height); // 枠線を描く
}

// STEP3

// "フレームを描く" ボタンをクリックしたら、draw_waku_fancyが呼ばれる
$("#fancy-waku-button").on("click", draw_waku_fancy);

// フレームの画像をダウンロードし、キャンバスに描画する関数
function draw_waku_fancy() {
  // Imageオブジェクトを作り、srcに画像ファイルを指定する
  // （画像のダウンロードが始まる）
  var img = new Image();
  img.src = "../files/img/frame_gold.png";

  // 画像ダウンロードが完了すると load イベントが発火するので
  // このタイミングで描画する
  img.onload = function(){
    context.drawImage(img, 0, 0, canvasElem.width, canvasElem.height);
  };

}

// STEP4

// 画像のダウンロード
// サーバー上で動作させる必要がある（localhostでも可）

// "画像を保存する"ボタンをクリックしたら create_download_link が呼ばれる
$("#download").on("click", create_download_link);

// 画像を DataURL に変換し、アンカー要素のhref属性にセットすると、
// ダウンロード出来るようになる
function create_download_link(){
  var url = canvasElem.toDataURL(); // キャンバス画像を DataURLに変換
  console.log(url); // DataURLが、どんなものかを知るため consoleに表示

  // アンカー要素のhref属性にDataURLを指定し、
  // download属性にファイル名を指定する
  $("#download-link").attr({
    href: url,
    download: "picture.png"
  });
}

// STEP5

// Webカメラからの取り込み
// サーバー上で動作させる必要がある（localhostでも可）

// "WebCamを使う"がクリックされたら、start_captureが呼ばれる
$("#webcam").on("click", start_capture);

// getUserMediaでカメラから映像を取得する。
// 映像を BlobURL に変換し、Video要素のsrcに指定すると
// 映像が表示される
function start_capture(){
  var video = $('video')[0]; // video要素の取得

  // カメラからの映像ストリーム取得を要求する。成功すると、
  // 第二引数のコールバック関数が呼ばれる
  navigator.webkitGetUserMedia({video: true}, function(stream){
    // 映像ストリームオブジェクトからBlobURLを生成する。
    var bloburl =  window.URL.createObjectURL(stream);
    // BlobURLが何なのかを確認するため、consoleに表示する
    console.log(bloburl);

    // video要素のsrc属性に生成した BlobURL をセットすると
    // カメラ映像が表示されるようになる。
    video.src = bloburl;
  });
}


// 余力が有る方
// 「再生ボタン」をクリックしないと、カメラ映像が流れません。
// 自動再生するようにしてみて下さい。

// さらに余力が有る方・・・・
//
// 1) 映像からスナップを撮った時に、下が切れていると思います。
// 　これを直してみて下さい。
// 2) このコードがFireFoxでも動くようにしてみてください。
//   ヒントは以下のとおり
//  - 映像ファイルのフォーマットがmpeg4になっている
//  - getUserMedia は、仕様化の初期段階のためベンダープレフィックス
//   がついています

