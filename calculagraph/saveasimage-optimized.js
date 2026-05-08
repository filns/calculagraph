// 临时保存saveAsImage函数的优化版本
function saveAsImage() {
    const cards = document.querySelectorAll('.event-card');
    const body = document.body;
    
    if (cards.length === 0 || !body) {
        alert('没有可保存的事件');
        return;
    }

    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '0';
    tempContainer.style.left = '0';
    tempContainer.style.width = '100%';
    tempContainer.style.height = '100%';
    tempContainer.style.zIndex = '-9999';
    tempContainer.style.display = 'flex';
    tempContainer.style.alignItems = 'center';
    tempContainer.style.justifyContent = 'center';
    tempContainer.style.flexDirection = 'column';
    tempContainer.style.gap = '20px';
    tempContainer.style.padding = '40px 20px';
    tempContainer.style.overflow = 'auto';
    
    const computedStyle = window.getComputedStyle(body);
    tempContainer.style.backgroundImage = computedStyle.backgroundImage;
    tempContainer.style.backgroundColor = computedStyle.backgroundColor;
    tempContainer.style.backgroundSize = computedStyle.backgroundSize;
    tempContainer.style.backgroundPosition = computedStyle.backgroundPosition;
    tempContainer.style.backgroundRepeat = computedStyle.backgroundRepeat;

    const header = document.createElement('div');
    header.style.textAlign = 'center';
    header.style.marginBottom = '30px';
    header.innerHTML = '<h1 style="font-size: 48px; font-weight: bold; color: #333; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">倒数日</h1>';
    tempContainer.appendChild(header);

    const cardsWrapper = document.createElement('div');
    cardsWrapper.style.display = 'flex';
    cardsWrapper.style.flexDirection = 'row';
    cardsWrapper.style.flexWrap = 'wrap';
    cardsWrapper.style.gap = '20px';
    cardsWrapper.style.justifyContent = 'center';
    cardsWrapper.style.width = '100%';
    cardsWrapper.style.maxWidth = '1400px';
    
    cards.forEach(card => {
        const cardClone = card.cloneNode(true);
        cardClone.style.transform = 'none';
        cardClone.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
        cardClone.style.position = 'relative';
        cardClone.style.flex = '0 0 calc(33.333% - 20px)';
        cardClone.style.minWidth = '280px';
        cardClone.style.maxWidth = '400px';
        
        const actions = cardClone.querySelector('.event-card-actions');
        if (actions) {
            actions.remove();
        }
        
        cardsWrapper.appendChild(cardClone);
    });
    
    tempContainer.appendChild(cardsWrapper);
    document.body.appendChild(tempContainer);

    html2canvas(tempContainer, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        logging: false,
        allowTaint: true,
        onclone: (clonedDoc) => {
            const clonedCards = clonedDoc.querySelectorAll('.event-card');
            clonedCards.forEach(card => {
                card.style.transform = 'none';
            });
        }
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `倒数日_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.png`;
        link.href = canvas.toDataURL('image/png', 1.0);
        link.click();
        
        document.body.removeChild(tempContainer);
    }).catch(error => {
        console.error('保存图片失败:', error);
        alert('保存图片失败，请重试');
        document.body.removeChild(tempContainer);
    });
}