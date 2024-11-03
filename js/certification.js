// JavaScriptファイル script.js

// ローカルストレージから失敗回数とロックアウト時間を取得
let failedAttempts = parseInt(localStorage.getItem("failedAttempts")) || 0;
let lockoutTime = parseInt(localStorage.getItem("lockoutTime")) || null;

// ログイン時間を取得
let loginTime = parseInt(localStorage.getItem("loginTime")) || null;

// ページが読み込まれたときに1時間経過しているかチェック
const currentTime = new Date().getTime();
if (loginTime && currentTime >= loginTime + 60 * 60 * 1000) {
    // 1時間経過した場合はログアウト
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginTime");
    alert("1時間が経過したため、自動的にログアウトしました。");
    window.location.href = "index.html"; // ログインページにリダイレクト
}

document.getElementById("searchButton").addEventListener("click", function() {
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

        // ログイン状態を保存し、ログイン時間を記録
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loginTime", currentTime.toString());

        // 別ページに移動（例：home.html）
        window.location.href = "List of shops.html";
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
