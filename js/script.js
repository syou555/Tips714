// 文字列の正規化関数
function normalize(str) {
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }).replace(/[ぁ-んァ-ヶ]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - (s >= "ァ" ? 0x60 : 0));
    });
}

// 店舗データを取得する非同期関数
async function getShopsData() {
    try {
        const response = await fetch("./Data/shopsData.json");//ジェイソンのファイル先
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const shops = await response.json();
        return shops;
    } catch (error) {
        console.error("Error loading shop data:", error);
        return [];
    }
}

// 検索機能の非同期関数
async function search() {
    const shops = await getShopsData(); // データを取得
    const addressInput = normalize(document.getElementById("addressInput").value).toLowerCase();
    const nameInput = normalize(document.getElementById("nameInput").value).toLowerCase();
    
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    if (addressInput.trim() === "" && nameInput.trim() === "") {
        document.getElementById("noResultsMessage").style.display = "none";
        return;
    }

    const filteredShops = shops.filter(shop => {
        const normalizedAddress = normalize(shop.address).toLowerCase();
        const normalizedName = normalize(shop.name).toLowerCase();
        const normalizedName2 = normalize(shop.name2).toLowerCase();
        const normalizedCategory = normalize(shop.category).toLowerCase();
        
        return (addressInput === "" || normalizedAddress.includes(addressInput)) &&
               (nameInput === "" || normalizedName.includes(nameInput) || normalizedName2.includes(nameInput) || normalizedCategory.includes(nameInput));
    });

    if (filteredShops.length === 0) {
        document.getElementById("noResultsMessage").style.display = "block";
    } else {
        document.getElementById("noResultsMessage").style.display = "none";
        filteredShops.forEach(shop => {
            const section = document.createElement("section");
            section.classList.add("frame");
            section.innerHTML = `
                <div class="container50">
                    <h2>${shop.name}</h2>
                    <div class="imagePosition">
                        <img src="${shop.img}" alt="エラー 画像が表示できません">
                        <img src="${shop.img2}" alt="エラー 画像が表示できません">
                    </div>
                    <p class="comment">${shop.comment}</p>
                    <div class="overview">
                        <div class="karte-temp-text"><span>営業時間:</span>${shop.hours}</div>
                        <div class="karte-temp-text"><span>定休日:</span>${shop.holiday}</div>
                        <div class="karte-temp-text"><span>電話番号:</span>${shop.phone}</div>
                        <div class="karte-temp-text"><span>住所:</span>${shop.address}</div>
                        <a href="${shop.link}" class="detail">詳細ページ</a>
                    </div>
                </div>
            `;
            searchResults.appendChild(section);
        });
    }
}
