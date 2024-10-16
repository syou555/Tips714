// JavaScriptファイル script.js

// ローカルストレージから失敗回数とロックアウト時間を取得
let failedAttempts = parseInt(localStorage.getItem("failedAttempts")) || 0;
let lockoutTime = parseInt(localStorage.getItem("lockoutTime")) || null;

document.getElementById("searchButton").addEventListener("click", function() {
    // 現在の時刻
    const currentTime = new Date().getTime();

    // ロックアウト中かどうかを確認
    if (lockoutTime && currentTime < lockoutTime) {
        alert("パスワード認証が一時的にロックされています。1時間後に再度お試しください。");
        return;
    }

    // パスワード入力の取得
    const password = document.getElementById("searchInput").value;

    // パスワードの検証
    if (password === "tipu778&tanuki599" && (!lockoutTime || currentTime >= lockoutTime)) {
        // 認証成功時、失敗回数とロックアウト時間をリセット
        failedAttempts = 0;
        lockoutTime = null;
        localStorage.removeItem("failedAttempts");
        localStorage.removeItem("lockoutTime");
        // 別ページに移動（例：success.html）
        window.location.href = "index.html";
    } else {
        // パスワードが間違っている場合
        failedAttempts++;
        // エラーメッセージの表示
        alert("パスワードが違います");

        // 失敗回数をローカルストレージに保存
        localStorage.setItem("failedAttempts", failedAttempts);

        // 3回以上失敗した場合、1時間のロックアウト
        if (failedAttempts >= 3) {
            lockoutTime = currentTime + 60 * 60 * 1000; // 現在の時刻 + 1時間
            localStorage.setItem("lockoutTime", lockoutTime);
            alert("3回パスワードを間違えたため、1時間認証ができません。");
        }
    }
});
