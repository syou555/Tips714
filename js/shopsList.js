// shopsData.jsonからデータを取得し、表示する
fetch('./Data/shopsData.json')//ジェイソンのファイル先
    .then(response => response.json())
    .then(data => {
        const shopList = document.getElementById('shop-list');

        data.forEach(shop => {
            const section = document.createElement('section');
            section.id = shop.name2; // id属性にname2を使用
            section.className = 'frame ' + shop.category; // クラス名にcategoryを使用

            section.innerHTML = `
                <div class="container50 " id="c1">
                    <h2>${shop.name}</h2>
                    <div class="imgStyle">
                    <img src="${shop.img}" alt="エラー 画像が表示できません">
                    <img src="${shop.img2}" alt="エラー 画像が表示できません">
                    </div>
                    <p class="comment">${shop.comment}</p>
                    <div class="overview">
                        <div class="karte-temp-text" id="c2"><span>営業時間:</span> ${shop.hours}</div>
                        <div class="karte-temp-text" id="c2"><span>定休日:</span> ${shop.holiday}</div>
                        <div class="karte-temp-text" id="c2"><span>電話番号:</span> ${shop.phone}</div>
                        <div class="karte-temp-text" id="c2"><span>住所:</span> ${shop.address}</div>
                        <a href="${shop.link}" class="detail">詳細ページ</a>
                    </div>
                </div>
            `;

            shopList.appendChild(section); // sectionをshop-listに追加
        });
    })
    .catch(error => console.error('Error fetching shops data:', error));
