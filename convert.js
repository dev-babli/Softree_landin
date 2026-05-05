const fs = require('fs');

let sliderHtml = `<section data-theme-section="light" class="product-slider">
<div class="product-slider__inner">
<div class="container">
<div class="product-slider__text-row">
<div class="product-slider__title"><h2 class="h-l">A growing toolkit for creative developers</h2></div>
<div class="product-slider__text"><p class="p-l">Access everything with a single membership:</p></div>
</div>
</div>
<div data-gsap-slider-rotate="20" data-gsap-slider-init="" data-gsap-slider-loop="true" data-gsap-slider-center="true" class="gsap-slider" data-gsap-drag-status="grab">
<img src="https://osmo.b-cdn.net/website/svg/product-slider-circle-deco.svg" alt="" loading="lazy" class="svg-img is--product-slider">
<div class="product-slider__nav">
<button data-button-rotate="" data-shape="" data-gsap-slider-control="1" data-gsap-slider-control-status="active" data-responsive="" data-size="" data-theme="" data-button-rotate-hover="" class="button" style="--y: 2080%;">
<div data-wf--button-theme--variant="neutral-300" class="button-bg"></div>
<div class="button-label__wrap">
<div class="button-label"><span>The Vault</span></div>
<div aria-hidden="true" class="button-label"><span aria-hidden="true">The Vault</span></div>
<div aria-hidden="true" class="button-label"><span>The Vault</span></div>
</div>
</button>
<button data-button-rotate="" data-shape="" data-gsap-slider-control="2" data-gsap-slider-control-status="not-active" data-responsive="" data-size="" data-theme="" data-button-rotate-hover="" class="button" style="--y: 4420%;">
<div data-wf--button-theme--variant="neutral-300" class="button-bg"></div>
<div class="button-label__wrap">
<div class="button-label"><span>Page Transition Course</span></div>
<div aria-hidden="true" class="button-label"><span aria-hidden="true">Page Transition Course</span></div>
<div aria-hidden="true" class="button-label"><span>Page Transition Course</span></div>
</div>
</button>
<button data-button-rotate="" data-shape="" data-gsap-slider-control="3" data-gsap-slider-control-status="not-active" data-responsive="" data-size="" data-theme="" data-button-rotate-hover="" class="button" style="--y: 1720%;">
<div data-wf--button-theme--variant="neutral-300" class="button-bg"></div>
<div class="button-label__wrap">
<div class="button-label"><span>Buttons</span></div>
<div aria-hidden="true" class="button-label"><span aria-hidden="true">Buttons</span></div>
<div aria-hidden="true" class="button-label"><span>Buttons</span></div>
</div>
</button>
<button data-button-rotate="" data-shape="" data-gsap-slider-control="4" data-gsap-slider-control-status="not-active" data-responsive="" data-size="" data-theme="" data-button-rotate-hover="" class="button" style="--y: 1720%;">
<div data-wf--button-theme--variant="neutral-300" class="button-bg"></div>
<div class="button-label__wrap">
<div class="button-label"><span>Easings</span></div>
<div aria-hidden="true" class="button-label"><span aria-hidden="true">Easings</span></div>
<div aria-hidden="true" class="button-label"><span>Easings</span></div>
</div>
</button>
<button data-button-rotate="" data-shape="" data-gsap-slider-control="5" data-gsap-slider-control-status="not-active" data-responsive="" data-size="" data-theme="" data-button-rotate-hover="" class="button" style="--y: 1360%;">
<div data-wf--button-theme--variant="neutral-300" class="button-bg"></div>
<div class="button-label__wrap">
<div class="button-label"><span>Icons</span></div>
<div aria-hidden="true" class="button-label"><span aria-hidden="true">Icons</span></div>
<div aria-hidden="true" class="button-label"><span>Icons</span></div>
</div>
</button>
<button data-button-rotate="" data-shape="" data-gsap-slider-control="6" data-gsap-slider-control-status="not-active" data-responsive="" data-size="" data-theme="" data-button-rotate-hover="" class="button" style="--y: 2080%;">
<div data-wf--button-theme--variant="neutral-300" class="button-bg"></div>
<div class="button-label__wrap">
<div class="button-label"><span>Community</span></div>
<div aria-hidden="true" class="button-label"><span aria-hidden="true">Community</span></div>
<div aria-hidden="true" class="button-label"><span>Community</span></div>
</div>
</button>
</div>
<div data-cursor-zone="neutral-600" data-gsap-slider-collection="" class="gsap-slider__collection is--products">
<div data-gsap-slider-list="" class="gsap-slider__list">
<div data-gsap-slider-item="" class="gsap-slider__item" data-gsap-slider-item-status="active">
<a href="/product/vault" class="product-card w-inline-block">
<div class="product-card__before"></div>
<div class="product-card__bg">
<img src="https://osmo.b-cdn.net/website/bandwidth/product-card-vault.avif" alt="" loading="lazy" class="cover-image">
</div>
<div class="product-card__content">
<div class="product-card__tags">
<div data-shape="" data-theme="" class="tag">
<div data-wf--button-theme--variant="light-10" class="button-bg"></div>
<span class="eyebrow is--relative">Part of the</span>
</div>
<div data-shape="round" data-theme="" class="tag">
<div data-wf--button-theme--variant="light-10" class="button-bg"></div>
<span class="eyebrow is--relative">Membership</span>
</div>
</div>
<div class="product-card__center-content">
<div class="product-card__icon">
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 187 187" fill="none" class="product-card__icon-svg"><path d="M126.049 76.7471L167.276 35.5197L150.805 19.0486L109.577 60.276C107.82 62.0398 104.808 60.7915 104.808 58.3009V0H81.517V70.3375C81.517 76.511 76.511 81.517 70.3375 81.517H0V104.808H58.3009C60.7915 104.808 62.0398 107.82 60.276 109.577L19.0548 150.805L35.5259 167.276L76.7533 126.049C78.5109 124.291 81.5232 125.533 81.5232 128.024V186.324H104.814V115.987C104.814 109.813 109.82 104.808 115.993 104.808H186.331V81.517H128.03C125.539 81.517 124.291 78.5047 126.055 76.7471H126.049Z" fill="currentColor"></path></svg>
</div>
<div class="product-card__title">
<h3 class="product-card__h">The Vault</h3>
</div>
<div class="product-card__text">
<p class="product-card__p">Our ever-growing dashboard packed with ready-to-go components.</p>
</div>
</div>
<div class="product-card__btn">
<button data-button-rotate="" data-shape="" data-responsive="" data-size="" data-theme="" data-button-rotate-hover="" class="button" style="--y: 1900%;">
<div data-wf--button-theme--variant="neutral-200" class="button-bg"></div>
<div class="button-label__wrap">
<div class="button-label"><span>Discover</span></div>
<div aria-hidden="true" class="button-label"><span aria-hidden="true">Discover</span></div>
<div aria-hidden="true" class="button-label"><span>Discover</span></div>
</div>
</button>
</div>
</div>
</a>
</div>
<div data-gsap-slider-item="" class="gsap-slider__item" data-gsap-slider-item-status="inview">
<a href="/product/page-transition-course" class="product-card is--electric w-inline-block">
<div class="product-card__before"></div>
<div class="product-card__ptc-preview">
<div class="product-card__ptc-preview-before"></div>
<img src="https://osmo.b-cdn.net/website/bandwidth/page-transition-course-thumb-1440x900.avif" alt="" loading="lazy" class="cover-image">
<video muted="" loop="" playsinline="" src="https://osmo.b-cdn.net/website/page-transition-course/page-transition-course-thumb-720x450.mp4" class="cover-video" preload="metadata"></video>
<div class="ptc-card__locked">
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 14 14" fill="none" class="ptc-card__locked-svg"><path d="M9.91602 12.2497H4.08268C3.4381 12.2497 2.91602 11.7276 2.91602 11.083V6.99967C2.91602 6.35509 3.4381 5.83301 4.08268 5.83301H9.91602C10.5606 5.83301 11.0827 6.35509 11.0827 6.99967V11.083C11.0827 11.7276 10.5606 12.2497 9.91602 12.2497Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4.66602 5.83333V4.08333C4.66602 2.79475 5.71077 1.75 6.99935 1.75C8.28793 1.75 9.33268 2.79475 9.33268 4.08333V5.83333" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>
</div>
</div>
<div class="product-card__content">
<div class="product-card__tags">
<div data-shape="" data-theme="" class="tag">
<div data-wf--button-theme--variant="dark-10" class="button-bg"></div>
<span class="eyebrow is--relative">Part of the</span>
</div>
<div data-shape="round" data-theme="" class="tag">
<div data-wf--button-theme--variant="dark-10" class="button-bg"></div>
<span class="eyebrow is--relative">Membership</span>
</div>
</div>
<div class="product-card__center-content">
<div class="product-card__icon">
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 187 187" fill="none" class="product-card__icon-svg"><path d="M126.049 76.7471L167.276 35.5197L150.805 19.0486L109.577 60.276C107.82 62.0398 104.808 60.7915 104.808 58.3009V0H81.517V70.3375C81.517 76.511 76.511 81.517 70.3375 81.517H0V104.808H58.3009C60.7915 104.808 62.0398 107.82 60.276 109.577L19.0548 150.805L35.5259 167.276L76.7533 126.049C78.5109 124.291 81.5232 125.533 81.5232 128.024V186.324H104.814V115.987C104.814 109.813 109.82 104.808 115.993 104.808H186.331V81.517H128.03C125.539 81.517 124.291 78.5047 126.055 76.7471H126.049Z" fill="currentColor"></path></svg>
</div>
<div class="product-card__title">
<h3 class="product-card__h is--m">Page Transition Course</h3>
</div>
<div class="product-card__text">
<p class="product-card__p">Learn how to create page transitions that take your websites to the next level.</p>
</div>
</div>
<div class="product-card__btn">
<button data-button-rotate="" data-shape="" data-responsive="" data-size="" data-theme="" data-button-rotate-hover="" class="button" style="--y: 1900%;">
<div data-wf--button-theme--variant="neutral-200" class="button-bg"></div>
<div class="button-label__wrap">
<div class="button-label"><span>Discover</span></div>
<div aria-hidden="true" class="button-label"><span aria-hidden="true">Discover</span></div>
<div aria-hidden="true" class="button-label"><span>Discover</span></div>
</div>
</button>
</div>
</div>
</a>
</div>
<div data-gsap-slider-item="" class="gsap-slider__item" data-gsap-slider-item-status="not-active">
<a href="/product/button-pack" class="product-card is--dark w-inline-block">
<div class="product-card__before"></div>
<div class="product-card__bg">
<img src="https://osmo.b-cdn.net/website/bandwidth/button-pack-product-card-2160x2808.avif" alt="" loading="lazy" class="cover-image">
</div>
<div class="product-card__content">
<div class="product-card__tags">
<div data-shape="" data-theme="" class="tag">
<div data-wf--button-theme--variant="light-10" class="button-bg"></div>
<span class="eyebrow is--relative">Part of the</span>
</div>
<div data-shape="round" data-theme="" class="tag">
<div data-wf--button-theme--variant="light-10" class="button-bg"></div>
<span class="eyebrow is--relative">Membership</span>
</div>
</div>
<div class="product-card__center-content">
<div class="product-card__icon">
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 187 187" fill="none" class="product-card__icon-svg"><path d="M126.049 76.7471L167.276 35.5197L150.805 19.0486L109.577 60.276C107.82 62.0398 104.808 60.7915 104.808 58.3009V0H81.517V70.3375C81.517 76.511 76.511 81.517 70.3375 81.517H0V104.808H58.3009C60.7915 104.808 62.0398 107.82 60.276 109.577L19.0548 150.805L35.5259 167.276L76.7533 126.049C78.5109 124.291 81.5232 125.533 81.5232 128.024V186.324H104.814V115.987C104.814 109.813 109.82 104.808 115.993 104.808H186.331V81.517H128.03C125.539 81.517 124.291 78.5047 126.055 76.7471H126.049Z" fill="currentColor"></path></svg>
</div>
<div class="product-card__title">
<h3 class="product-card__h">Buttons</h3>
</div>
<div class="product-card__text">
<p class="product-card__p">Coming soon, 100 fully accessible buttons made together with Eduard Bodak.</p>
</div>
</div>
<div class="product-card__btn">
<button data-button-rotate="" data-shape="" data-responsive="" data-size="" data-theme="" data-button-rotate-hover="" class="button" style="--y: 1900%;">
<div data-wf--button-theme--variant="neutral-200" class="button-bg"></div>
<div class="button-label__wrap">
<div class="button-label"><span>Discover</span></div>
<div aria-hidden="true" class="button-label"><span aria-hidden="true">Discover</span></div>
<div aria-hidden="true" class="button-label"><span>Discover</span></div>
</div>
</button>
</div>
</div>
</a>
</div>
<div data-gsap-slider-item="" class="gsap-slider__item" data-gsap-slider-item-status="not-active">
<div class="product-card is--neutral-400 is--disabled">
<div class="product-card__before"></div>
<div class="product-card__bg">
<img src="https://osmo.b-cdn.net/website/bandwidth/product-card-easings.avif" alt="" loading="lazy" class="cover-image">
</div>
<div class="product-card__content">
<div class="product-card__tags">
<div data-shape="" data-theme="" class="tag">
<div data-wf--button-theme--variant="dark-10" class="button-bg"></div>
<span class="eyebrow is--relative">Part of the</span>
</div>
<div data-shape="round" data-theme="" class="tag">
<div data-wf--button-theme--variant="dark-10" class="button-bg"></div>
<span class="eyebrow is--relative">membership</span>
</div>
</div>
<div class="product-card__center-content">
<div class="product-card__icon">
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 187 187" fill="none" class="product-card__icon-svg"><path d="M126.049 76.7471L167.276 35.5197L150.805 19.0486L109.577 60.276C107.82 62.0398 104.808 60.7915 104.808 58.3009V0H81.517V70.3375C81.517 76.511 76.511 81.517 70.3375 81.517H0V104.808H58.3009C60.7915 104.808 62.0398 107.82 60.276 109.577L19.0548 150.805L35.5259 167.276L76.7533 126.049C78.5109 124.291 81.5232 125.533 81.5232 128.024V186.324H104.814V115.987C104.814 109.813 109.82 104.808 115.993 104.808H186.331V81.517H128.03C125.539 81.517 124.291 78.5047 126.055 76.7471H126.049Z" fill="currentColor"></path></svg>
</div>
<div class="product-card__title">
<h3 class="product-card__h">Easings</h3>
</div>
<div class="product-card__text">
<p class="product-card__p">Ready-to-paste easings for CSS and GSAP inside the Osmo Vault.</p>
</div>
</div>
<div class="product-card__btn"></div>
</div>
</div>
</div>
<div data-gsap-slider-item="" class="gsap-slider__item" data-gsap-slider-item-status="not-active">
<a href="/product/icons" class="product-card is--black w-inline-block">
<div class="product-card__before"></div>
<div class="product-card__bg">
<img src="https://osmo.b-cdn.net/website/bandwidth/product-card-icons.avif" alt="" loading="lazy" class="cover-image">
</div>
<div class="product-card__content">
<div class="product-card__tags">
<div data-shape="" data-theme="" class="tag">
<div data-wf--button-theme--variant="light-10" class="button-bg"></div>
<span class="eyebrow is--relative">Part of the</span>
</div>
<div data-shape="round" data-theme="" class="tag">
<div data-wf--button-theme--variant="light-10" class="button-bg"></div>
<span class="eyebrow is--relative">Membership</span>
</div>
</div>
<div class="product-card__center-content">
<div class="product-card__icon">
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 187 187" fill="none" class="product-card__icon-svg"><path d="M126.049 76.7471L167.276 35.5197L150.805 19.0486L109.577 60.276C107.82 62.0398 104.808 60.7915 104.808 58.3009V0H81.517V70.3375C81.517 76.511 76.511 81.517 70.3375 81.517H0V104.808H58.3009C60.7915 104.808 62.0398 107.82 60.276 109.577L19.0548 150.805L35.5259 167.276L76.7533 126.049C78.5109 124.291 81.5232 125.533 81.5232 128.024V186.324H104.814V115.987C104.814 109.813 109.82 104.808 115.993 104.808H186.331V81.517H128.03C125.539 81.517 124.291 78.5047 126.055 76.7471H126.049Z" fill="currentColor"></path></svg>
</div>
<div class="product-card__title">
<h3 class="product-card__h">Icons</h3>
</div>
<div class="product-card__text">
<p class="product-card__p">A uniform library of clean, scalable SVG icons you can copy or download in seconds.</p>
</div>
</div>
<div class="product-card__btn">
<button data-button-rotate="" data-shape="" data-responsive="" data-size="" data-theme="" data-button-rotate-hover="" class="button" style="--y: 1900%;">
<div data-wf--button-theme--variant="neutral-200" class="button-bg"></div>
<div class="button-label__wrap">
<div class="button-label"><span>Discover</span></div>
<div aria-hidden="true" class="button-label"><span aria-hidden="true">Discover</span></div>
<div aria-hidden="true" class="button-label"><span>Discover</span></div>
</div>
</button>
</div>
</div>
</a>
</div>
<div data-gsap-slider-item="" class="gsap-slider__item" data-gsap-slider-item-status="inview">
<a href="/product/community" class="product-card is--purple w-inline-block">
<div class="product-card__before"></div>
<div class="product-card__bg">
<img src="https://osmo.b-cdn.net/website/bandwidth/product-card-community.avif" alt="" loading="lazy" class="cover-image">
</div>
<div class="product-card__content">
<div class="product-card__tags">
<div data-shape="" data-theme="" class="tag">
<div data-wf--button-theme--variant="light-10" class="button-bg"></div>
<span class="eyebrow is--relative">Part of the</span>
</div>
<div data-shape="round" data-theme="" class="tag">
<div data-wf--button-theme--variant="light-10" class="button-bg"></div>
<span class="eyebrow is--relative">Membership</span>
</div>
</div>
<div class="product-card__center-content">
<div class="product-card__icon">
<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 187 187" fill="none" class="product-card__icon-svg"><path d="M126.049 76.7471L167.276 35.5197L150.805 19.0486L109.577 60.276C107.82 62.0398 104.808 60.7915 104.808 58.3009V0H81.517V70.3375C81.517 76.511 76.511 81.517 70.3375 81.517H0V104.808H58.3009C60.7915 104.808 62.0398 107.82 60.276 109.577L19.0548 150.805L35.5259 167.276L76.7533 126.049C78.5109 124.291 81.5232 125.533 81.5232 128.024V186.324H104.814V115.987C104.814 109.813 109.82 104.808 115.993 104.808H186.331V81.517H128.03C125.539 81.517 124.291 78.5047 126.055 76.7471H126.049Z" fill="currentColor"></path></svg>
</div>
<div class="product-card__title">
<h3 class="product-card__h">Community</h3>
</div>
<div class="product-card__text">
<p class="product-card__p">Connect with the people who love building great websites as much as you do.</p>
</div>
</div>
<div class="product-card__btn">
<button data-button-rotate="" data-shape="" data-responsive="" data-size="" data-theme="" data-button-rotate-hover="" class="button" style="--y: 1900%;">
<div data-wf--button-theme--variant="neutral-200" class="button-bg"></div>
<div class="button-label__wrap">
<div class="button-label"><span>Discover</span></div>
<div aria-hidden="true" class="button-label"><span aria-hidden="true">Discover</span></div>
<div aria-hidden="true" class="button-label"><span>Discover</span></div>
</div>
</button>
</div>
</div>
</a>
</div>
</div>
</div>
</div>
<div class="product-slider__fade"></div>
</section>`;

let infoHtml = `<section data-theme-section="light" class="info"><div class="container is--md-m"><div class="info__wrap"><div class="info__small-col"><img src="https://osmo.b-cdn.net/website/bandwidth/osmo-micrographic-2.avif" alt="" loading="lazy" class="info__graphic"></div><div class="info__large-col"><div class="info__scribble"><p class="scribble">Why Osmo?</p><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" fill="none" class="scribble-arrow is--info-col"><path d="M30.3491 31.5811L30.558 30.3311L31.1618 29.9525C29.2036 30.1222 28.2898 27.0739 26.4295 26.369C25.8681 26.1568 25.7735 26.8128 25.9497 27.0119C25.9921 27.0609 26.6775 27.2502 27.0985 27.6516C27.4575 27.9975 29.1938 29.5543 28.8805 29.9492C23.8153 29.4434 19.1711 28.2358 14.7619 25.6477C5.77699 20.3802 0.852119 10.8502 0.0231477 0.612125C-0.616531 15.7327 12.0922 28.8428 26.9223 30.2821C26.5796 31.1372 23.8022 30.2234 23.9882 31.5811H30.3459H30.3491Z" fill="currentColor"></path></svg></div><div class="info__title"><h3 class="h-ml is--long">Level up your game and join a community of creatives who love building great websites as much as you do.</h3></div><ul class="info__list"><li class="info__li"><div class="info__li-title"><h4 class="p-l u--fw-medium">Build faster and better</h4></div><p class="p-m">Our resources save you hours of rebuilding from scratch. Each one is made for real-world projects, so you can focus on shipping work that stands out.</p></li><li class="info__li"><div class="info__li-title"><h4 class="p-l u--fw-medium">Speed up your process</h4></div><p class="p-m">These aren’t stripped-down templates. Every resource is built to be fast, flexible, and production-ready, so you can ship beautiful work without trading quality for time.</p></li><li class="info__li"><div class="info__li-title"><h4 class="p-l u--fw-medium">A living and growing system</h4></div><p class="p-m">We keep adding new resources, ideas, and techniques every week. The Vault evolves with you and your needs, so your toolkit never stops expanding.</p></li></ul><div class="trustedby-wrap"><div class="tag-row"><div class="tag-row__line"></div><div class="button-row"><div data-shape="" data-theme="" class="tag"><div data-wf--button-theme--variant="dark-10" class="button-bg"></div><span class="eyebrow is--relative">Trusted by</span></div><div data-shape="round" data-theme="" class="tag"><div data-wf--button-theme--variant="dark-10" class="button-bg"></div><span class="eyebrow is--relative">Industry Giants</span></div></div><div class="tag-row__line"></div></div><div class="trustedby-row"><div data-css-marquee="auto" class="trustedby-marquee"><div data-css-marquee-list="" class="trustedby-marquee__collection" style="animation-duration: 41.62s; animation-play-state: running;"><div class="trustedby-marquee__item"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 172 42" fill="none" class="trustedby-marquee__item-svg"><path d="M0.803201 18.3259C0.803201 12.2668 13.2516 11.0089 14.0323 18.263C14.0533 18.7452 13.8424 18.9758 13.4836 18.9758H10.3821C10.0234 18.9758 9.85467 18.8081 9.77022 18.4307C9.28498 15.5794 5.0019 16.2293 5.0019 18.3259C5.0019 21.5966 14.3488 19.1855 14.3488 25.3495C14.3488 32.1842 0.718809 32.352 0.00144457 25.0768C-0.0196544 24.6366 0.191335 24.4479 0.571116 24.4479H3.67267C4.01025 24.4479 4.20014 24.6366 4.28454 25.035C4.812 27.8863 10.0023 27.7605 10.0023 25.3495C10.0023 22.2885 0.803201 24.4479 0.803201 18.3259ZM26.7127 14.3005C26.7127 13.9022 26.8815 13.6715 27.3457 13.6715H30.2995C30.7426 13.6715 30.9536 13.9022 30.9536 14.3005V22.4981C30.9536 26.5655 28.4006 30.3183 23.3369 30.3183C18.2731 30.3183 15.699 26.5655 15.699 22.4981L15.678 14.3005C15.678 13.9022 15.9101 13.6715 16.332 13.6715H19.3281C19.8133 13.6715 19.9821 13.9022 19.9821 14.3005L20.0032 22.4981C20.0032 25.5801 21.5857 26.5445 23.3369 26.5445C25.0881 26.5445 26.6916 25.5801 26.6916 22.4981L26.7127 14.3005ZM63.5093 20.087H55.4917C55.4917 18.4307 57.1162 16.5019 59.7114 16.5019C62.3066 16.5019 63.5093 18.4307 63.5093 20.087ZM67.729 22.54V21.953C67.729 17.2357 65.0072 13.1684 59.606 13.1684C55.5971 13.1684 52.7277 15.81 51.6728 19.2694C51.2086 20.7789 51.1453 22.4142 51.4829 23.9866C52.3268 27.8443 55.3439 30.7795 59.606 30.7795C60.2811 30.7795 65.8512 30.7795 67.5603 25.3704C67.6657 25.014 67.5181 24.8882 67.2227 24.8882H63.8469C63.6359 24.8882 63.4881 24.993 63.3827 25.2026C63.0451 25.9155 62.1589 27.3202 59.606 27.3202C57.3484 27.3202 55.4917 25.3075 55.4917 23.2109H67.075C67.497 23.2109 67.729 22.9593 67.729 22.54ZM155.269 20.129H147.842C147.842 18.5146 149.213 16.6277 151.766 16.6277C154.319 16.6277 155.269 18.5146 155.269 20.129ZM159.805 22.54V21.953C159.805 17.2357 157.062 13.1684 151.661 13.1684C147.652 13.1684 144.782 15.7891 143.728 19.2694C143.242 20.7789 143.179 22.4142 143.538 23.9866C144.361 27.8443 147.399 30.7795 151.661 30.7795C152.335 30.7795 157.906 30.7795 159.636 25.3913C159.742 25.014 159.594 24.8882 159.277 24.8882H155.923C155.69 24.8882 155.543 24.993 155.438 25.2026C155.1 25.9155 154.213 27.3412 151.661 27.3412C149.403 27.3412 147.757 25.3285 147.757 23.2109H159.129C159.573 23.2109 159.805 22.9593 159.805 22.54ZM171.114 13.6715C171.705 13.6715 172 14.007 172 14.615V17.068C172 17.6969 171.662 17.9695 171.029 17.9695C167.337 17.9695 165.565 19.6887 165.565 24.1124V29.6683C165.565 30.0667 165.311 30.2764 164.953 30.2764H161.809C161.451 30.2764 161.239 30.0667 161.239 29.6683V24.1124C161.239 20.2967 162.315 13.6715 171.114 13.6715ZM132.123 13.6715H128.726C128.494 13.6715 128.41 13.7554 128.325 14.007L124.907 24.0705L122.249 14.007C122.185 13.7554 122.08 13.6715 121.848 13.6715H117.86C117.522 13.6715 117.565 13.8812 117.628 14.1118L121.721 29.8361C121.805 30.1925 121.953 30.2764 122.354 30.2764H126.595C126.911 30.2764 127.102 30.1506 127.207 29.8151L130.435 20.0032L133.642 29.8151C133.748 30.1506 133.959 30.2764 134.254 30.2764H138.516C138.917 30.2764 139.064 30.1925 139.149 29.8361L143.242 14.1118C143.305 13.8812 143.347 13.6715 142.989 13.6715H139.022C138.769 13.6715 138.664 13.7554 138.6 14.007L135.942 24.0705L132.545 14.007C132.461 13.7554 132.355 13.6715 132.123 13.6715ZM104.589 21.953C104.589 18.9968 106.192 17.0889 108.745 17.0889C111.299 17.0889 113.134 18.9968 113.134 21.953C113.134 24.9092 111.235 26.859 108.745 26.859C106.256 26.859 104.589 24.9301 104.589 21.953ZM108.745 13.1684C103.766 13.1684 100.179 17.2357 100.179 21.953C100.179 26.6703 103.766 30.7795 108.745 30.7795C113.725 30.7795 117.543 26.7961 117.543 21.953C117.543 17.1099 113.535 13.1684 108.745 13.1684ZM79.1649 13.6715C79.7553 13.6715 80.0505 14.007 80.0505 14.615V17.068C80.0505 17.6969 79.7135 17.9695 79.0805 17.9695C75.388 17.9695 73.6156 19.6887 73.6156 24.1124V29.6683C73.6156 30.0667 73.3625 30.2764 73.0038 30.2764H69.86C69.5013 30.2764 69.2904 30.0667 69.2904 29.6683V24.1124C69.2904 20.2967 70.3664 13.6715 79.1649 13.6715ZM85.8319 21.6176C85.8319 24.5317 87.4147 26.4397 89.925 26.4397C92.4361 26.4397 94.208 24.5527 94.208 21.6176C94.208 18.6823 92.3725 16.8374 89.925 16.8374C87.4775 16.8374 85.8319 18.7243 85.8319 21.6176ZM86.0643 28.5781V35.392C86.0643 35.7903 85.8319 36 85.4732 36H82.3082C81.9495 36 81.7387 35.7903 81.7387 35.392V14.594C81.7387 13.986 82.0765 13.6715 82.6878 13.6715H85.3043C85.9372 13.6715 86.0643 13.986 86.0643 14.594V16.1036H86.296C89.5245 10.0654 98.7234 13.3361 98.7234 21.6176C98.7234 30.507 89.3765 32.1003 86.0643 28.5781ZM36.8824 21.6176C36.8824 24.5317 38.4859 26.4397 40.9756 26.4397C43.4653 26.4397 45.2587 24.5527 45.2587 21.6176C45.2587 18.6823 43.4442 16.8374 40.9756 16.8374C38.507 16.8374 36.8824 18.7243 36.8824 21.6176ZM37.0723 28.5781V35.392C37.0723 35.7903 36.8191 36 36.4604 36H33.3167C32.9369 36 32.747 35.7903 32.747 35.392V14.594C32.747 13.986 33.0635 13.6715 33.6754 13.6715H36.3128C36.9457 13.6715 37.0723 13.986 37.0723 14.594V16.1036H37.2832C40.5114 10.0654 49.7106 13.3361 49.7106 21.6176C49.7106 30.507 40.3638 32.1003 37.0723 28.5781Z" fill="currentColor"></path></svg></div><div class="trustedby-marquee__item"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 90 42" fill="none" class="trustedby-marquee__item-svg"><g clip-path="url(#clip0_1002_2355)"><path d="M21.0048 12.1947C29.2464 11.3535 35.6047 19.0927 32.2285 26.8705C28.8386 34.6793 17.8349 35.4286 13.3561 28.1889C9.39692 21.788 13.4904 12.9615 21.006 12.1947H21.0048ZM21.6238 16.5316C13.5202 17.512 15.1026 30.0231 23.4387 28.7568C31.3161 27.5601 29.7983 15.5424 21.6238 16.5316Z" fill="currentColor"></path><path d="M75.5459 7.19922V21.0846L82.6861 12.7775H88.3359L81.1509 20.8771L89.0817 32.6139H84.1144L78.3403 23.9377L75.5459 27.0966V32.6139H70.8271V7.19922H75.5459Z" fill="currentColor"></path><path d="M51.4549 32.6144V20.5271C51.4549 20.3991 51.1789 19.4547 51.1056 19.2646C49.8438 16.0076 44.5633 16.2822 42.3854 18.4146C42.1853 18.611 41.3971 19.6933 41.3971 19.907V32.6144H36.8027V12.778H40.7768L41.0267 15.0085C41.2132 15.0172 41.1808 14.7737 41.3325 14.6357C44.7621 11.4868 51.481 11.3253 54.488 15.144C57.5136 18.9862 55.6316 27.4897 56.181 32.1857L55.9884 32.6132H51.4561L51.4549 32.6144Z" fill="currentColor"></path><path d="M5.25973 7.19922V12.7775H10.4757V17.1168H5.25973V32.6139H0.541016V7.19922H5.25973Z" fill="currentColor"></path><path d="M65.7353 12.7773V32.4274L65.5489 32.6138H61.0166V12.7773H65.7353Z" fill="currentColor"></path></g><defs><clipPath id="clip0_1002_2355"><rect width="89" height="41" fill="currentColor" transform="translate(0.770508 0.0664062)"></rect></clipPath></defs></svg></div><div class="trustedby-marquee__item"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 137 41" fill="none" class="trustedby-marquee__item-svg"><g clip-path="url(#clip0_865_5099)"><path fill-rule="evenodd" clip-rule="evenodd" d="M36.6737 9.15332L24.9715 32.0297H13.9799L18.8773 22.5487H18.6576C14.6173 27.7935 8.58918 31.2461 0 32.0297V22.68C0 22.68 5.4947 22.3554 8.72488 18.9593H0V9.1535H9.80583V17.2186L10.0259 17.2177L14.0329 9.1535H21.4488V17.1675L21.6689 17.1672L25.8262 9.15332H36.6737Z" fill="currentColor"></path><path d="M100.486 29.5042H103.644V11.377H100.486V29.5042Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M83.0761 29.3192C83.7625 29.6046 84.4604 29.7471 85.1699 29.7471C86.3422 29.7471 87.3909 29.4619 88.3164 28.8912C89.2418 28.3205 89.959 27.5338 90.4681 26.5313C90.9771 25.521 91.2315 24.3758 91.2315 23.0956C91.2315 21.8153 90.9694 20.6701 90.445 19.6598C89.9205 18.6496 89.1918 17.8668 88.2586 17.3115C87.3255 16.7485 86.265 16.4709 85.0773 16.4786C84.3216 16.4786 83.5967 16.6251 82.9026 16.9182C82.2084 17.2113 81.6301 17.6277 81.1673 18.1676C81.1316 18.2087 81.0969 18.2502 81.0632 18.2921V11.3887H77.8936V29.5043H81.0401L81.0338 27.812C81.1152 27.9117 81.2021 28.0092 81.2946 28.1045C81.7959 28.6213 82.3897 29.0261 83.0761 29.3192ZM86.3151 26.3924C85.7984 26.7086 85.2084 26.8668 84.5453 26.8668C83.8897 26.8668 83.2881 26.7048 82.7406 26.3809C82.193 26.0492 81.7573 25.5981 81.4334 25.0274C81.1172 24.4568 80.9592 23.809 80.9592 23.084C80.9514 22.3591 81.1057 21.7112 81.4218 21.1406C81.7457 20.5622 82.1815 20.1149 82.729 19.7987C83.2766 19.4748 83.8819 19.3167 84.5453 19.3244C85.2084 19.3167 85.7984 19.4709 86.3151 19.7871C86.8395 20.0956 87.2406 20.539 87.5182 21.1174C87.8035 21.6881 87.9462 22.3437 87.9462 23.084C87.9462 23.8243 87.8035 24.4799 87.5182 25.0506C87.2406 25.6212 86.8395 26.0685 86.3151 26.3924Z" fill="currentColor"></path><path d="M41.249 12.4766H44.8582L48.0869 24.2675L51.5215 12.4766H54.5292L58.2542 24.0309L61.3543 12.4766H64.6628L59.7811 29.5048H56.6692L52.8816 18.2171L49.4045 29.5048H46.2579L41.249 12.4766Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M69.9923 29.8051C68.7352 29.8128 67.6016 29.5351 66.5913 28.9722C65.5888 28.4015 64.7983 27.611 64.2199 26.6008C63.6492 25.5904 63.3638 24.4375 63.3638 23.1419C63.3638 21.8849 63.6569 20.7473 64.243 19.7293C64.829 18.7113 65.6235 17.917 66.626 17.3463C67.6285 16.7756 68.7468 16.4902 69.9808 16.4902C71.3689 16.4902 72.5836 16.7987 73.6247 17.4157C74.6735 18.0326 75.4563 18.908 75.973 20.0416C76.4974 21.1676 76.6864 22.4594 76.5398 23.9169H66.6309C66.6586 24.4976 66.8035 25.026 67.0656 25.5017C67.3587 26.0261 67.7674 26.4349 68.2917 26.728C68.8162 27.021 69.4023 27.1675 70.0502 27.1675C70.5437 27.1599 71.0026 27.075 71.4267 26.9131C71.8509 26.7435 72.2095 26.5159 72.5026 26.2306C72.8033 25.9452 73.0154 25.6213 73.1388 25.2589H76.4473C76.2468 26.1457 75.8458 26.9362 75.2442 27.6303C74.6427 28.3166 73.8868 28.8526 72.9769 29.2383C72.0668 29.6238 71.0719 29.8128 69.9923 29.8051ZM67.0772 20.7357C66.8923 21.058 66.7643 21.4051 66.693 21.7769H73.2614C73.2137 21.3071 73.0688 20.8791 72.8264 20.4928C72.5489 20.0378 72.171 19.6869 71.6928 19.4401C71.2146 19.1856 70.6748 19.0584 70.0733 19.0584C69.4332 19.0584 68.851 19.2049 68.3266 19.4979C67.8021 19.791 67.3856 20.2036 67.0772 20.7357Z" fill="currentColor"></path><path d="M93.5564 16.7566C93.5564 15.7231 93.7918 14.8054 94.2622 14.0034C94.7326 13.1936 95.392 12.5651 96.2403 12.1178C97.0963 11.6627 98.0951 11.4275 99.2364 11.4121V14.2231C98.7043 14.2309 98.2493 14.3427 97.8714 14.5586C97.5013 14.7668 97.2159 15.0715 97.0153 15.4725C96.8307 15.8417 96.7311 16.2697 96.7165 16.7566H99.1671V19.4288H96.7146V29.5046H93.5564V19.4288H91.5205V16.7566H93.5564Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M111.672 29.7819C110.384 29.7819 109.231 29.5003 108.213 28.9373C107.203 28.3667 106.409 27.58 105.83 26.5775C105.26 25.5671 104.974 24.422 104.974 23.1417C104.974 21.8538 105.26 20.7047 105.83 19.6944C106.409 18.6765 107.203 17.886 108.213 17.323C109.231 16.76 110.384 16.4785 111.672 16.4785C112.968 16.4785 114.125 16.76 115.143 17.323C116.168 17.886 116.966 18.6726 117.537 19.6829C118.108 20.6931 118.397 21.8461 118.405 23.1417C118.397 24.422 118.108 25.5671 117.537 26.5775C116.974 27.58 116.18 28.3667 115.154 28.9373C114.128 29.5003 112.968 29.7819 111.672 29.7819ZM111.672 26.8783C112.351 26.8783 112.952 26.724 113.477 26.4155C114.001 26.0993 114.406 25.6596 114.691 25.0967C114.977 24.526 115.119 23.8744 115.119 23.1417C115.119 22.4014 114.977 21.7458 114.691 21.1752C114.406 20.6045 114.001 20.1649 113.477 19.8564C112.952 19.5402 112.351 19.3821 111.672 19.3821C111.001 19.3821 110.404 19.5402 109.879 19.8564C109.362 20.1649 108.961 20.6045 108.676 21.1752C108.391 21.7458 108.252 22.4014 108.26 23.1417C108.26 23.8744 108.402 24.526 108.688 25.0967C108.981 25.6596 109.382 26.0993 109.891 26.4155C110.407 26.724 111.001 26.8783 111.672 26.8783Z" fill="currentColor"></path><path d="M121.817 16.7568H118.301L122.107 29.5049H125.184L127.687 21.3627L130.39 29.5049H133.42L137.238 16.7568H134.057L131.892 24.6917L129.499 16.7568H126.422L124.04 24.8665L121.817 16.7568Z" fill="currentColor"></path></g><defs><clipPath id="clip0_865_5099"><rect width="137" height="41" fill="currentColor"></rect></clipPath></defs></svg></div><div class="trustedby-marquee__item"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 70 40" fill="none" class="trustedby-marquee__item-svg"><g clip-path="url(#clip0_865_5117)"><path d="M20.0288 32.1984C20.0288 29.0567 18.3074 26.6357 13.9311 26.6357H9.24902V37.7604H13.9311C18.3074 37.7604 20.0288 35.3401 20.0288 32.1977V32.1984ZM16.843 32.1984C16.843 34.3944 15.6043 35.2117 13.8823 35.2117H12.2897V29.1844H13.8823C15.6037 29.1844 16.843 30.0017 16.843 32.1977V32.1984Z" fill="currentColor"></path><path d="M20.7573 37.761H29.6062V35.2279H23.798V33.3204H28.8984V30.9156H23.798V29.1682H29.4611V26.6357H20.7573V37.7604V37.761Z" fill="currentColor"></path><path d="M39.907 30.4989C39.907 27.6936 38.105 26.6357 35.3056 26.6357H30.4629V37.7604H33.5036V34.362H35.3056C38.105 34.362 39.907 33.3042 39.907 30.4989ZM36.7538 30.4989C36.7538 31.5891 36.2392 32.0376 34.9999 32.0376H33.5036V28.9601H34.9999C36.2385 28.9601 36.7538 29.4086 36.7538 30.4989Z" fill="currentColor"></path><path d="M40.2388 29.2333H43.7622V37.7613H46.8029V29.2333H50.3263V26.6367H40.2388V29.2333Z" fill="currentColor"></path><path d="M49.063 36.2839C49.063 37.2905 49.8807 38.1053 50.8917 38.1053C51.9027 38.1053 52.7282 37.2905 52.7282 36.2839C52.7282 35.2773 51.902 34.4541 50.8917 34.4541C49.8814 34.4541 49.063 35.2773 49.063 36.2839ZM49.4156 36.2839C49.4156 35.4529 50.0733 34.7737 50.8911 34.7737C51.7088 34.7737 52.3743 35.4529 52.3743 36.2839C52.3743 37.1149 51.7088 37.7857 50.8911 37.7857C50.0733 37.7857 49.4156 37.1149 49.4156 36.2839ZM50.033 37.1868H50.6107V36.5639H50.9392L51.284 37.1868H51.9092L51.4922 36.4518C51.6847 36.3721 51.8292 36.1562 51.8292 35.9164C51.8292 35.4931 51.5566 35.2928 51.0914 35.2928H50.033V37.1868ZM51.2437 35.9242C51.2437 36.0758 51.1474 36.14 50.9626 36.14H50.61V35.7407H50.9626C51.1474 35.7407 51.2437 35.7887 51.2437 35.9248V35.9242Z" fill="currentColor"></path><path d="M0.597168 11.5847H3.64763V7.27503H8.23211V11.5854H11.2826V0.423828H8.23211V4.65317H3.64763V0.423828H0.597168V11.5847Z" fill="currentColor"></path><path d="M12.2935 11.5847H21.171V9.0439H15.3439V7.12984H20.4606V4.71734H15.3439V2.96467H21.0259V0.423828H12.2935V11.5847Z" fill="currentColor"></path><path d="M22.0083 11.5847H30.4343V8.96353H25.0594V0.423828H22.009V11.5847H22.0083Z" fill="currentColor"></path><path d="M31.1772 11.5847H39.6033V8.96353H34.2284V0.423828H31.1779V11.5847H31.1772Z" fill="currentColor"></path><path d="M51.3601 6.00376C51.3601 2.53019 49.197 0.230469 45.4842 0.230469C41.7715 0.230469 39.6084 2.53019 39.6084 6.00376C39.6084 9.47733 41.7715 11.7771 45.4842 11.7771C49.197 11.7771 51.3601 9.47733 51.3601 6.00376ZM48.1476 6.00376C48.1476 7.86921 47.1308 9.23621 45.4842 9.23621C43.8377 9.23621 42.8208 7.86921 42.8208 6.00376C42.8208 4.13831 43.8377 2.77131 45.4842 2.77131C47.1308 2.77131 48.1476 4.13831 48.1476 6.00376Z" fill="currentColor"></path><path d="M5.98834 24.6772H8.45785L10.9924 16.8771V24.6772H13.8497V13.5156H9.70107L7.23155 21.0422L4.76204 13.5156H0.597168V24.6765H3.45442V16.8764L5.98834 24.6765V24.6772Z" fill="currentColor"></path><path d="M26.3098 19.0962C26.3098 15.6226 24.1467 13.3223 20.4339 13.3223C16.7212 13.3223 14.5581 15.622 14.5581 19.0962C14.5581 22.5704 16.7212 24.8695 20.4339 24.8695C24.1467 24.8695 26.3098 22.5698 26.3098 19.0962ZM23.0973 19.0962C23.0973 20.9617 22.0805 22.3287 20.4339 22.3287C18.7874 22.3287 17.7706 20.9617 17.7706 19.0962C17.7706 17.2308 18.7874 15.8638 20.4339 15.8638C22.0805 15.8638 23.0973 17.2308 23.0973 19.0962Z" fill="currentColor"></path><path d="M37.9137 13.5156H34.9439V20.8173L30.7146 13.5156H27.147V24.6765H30.1168V17.4073L34.3135 24.6765H37.9131V13.5156H37.9137Z" fill="currentColor"></path><path d="M49.6728 19.0964C49.6728 15.9443 47.9455 13.5156 43.5549 13.5156H38.8579V24.6765H43.5549C47.9455 24.6765 49.6728 22.2485 49.6728 19.0958V19.0964ZM46.4766 19.0964C46.4766 21.2996 45.234 22.1201 43.5068 22.1201H41.909V16.0733H43.5068C45.234 16.0733 46.4766 16.8933 46.4766 19.0971V19.0964Z" fill="currentColor"></path><path d="M57.3883 24.6765H60.5845L56.6941 13.5156H52.675L48.7847 24.6765H51.9165L52.4811 22.8753H56.823L57.3876 24.6765H57.3883ZM54.6605 15.9599L56.0651 20.479H53.2403L54.6612 15.9599H54.6605Z" fill="currentColor"></path><path d="M62.4576 24.6765H65.5087V20.6883L70.0281 13.5156H66.5899L64.056 17.6328L61.5377 13.5156H57.9707L62.4576 20.6721V24.6765Z" fill="currentColor"></path><path d="M7.26348 26.5771H4.7777L0 39.8129H2.46952L7.26348 26.5771Z" fill="currentColor"></path></g><defs><clipPath id="clip0_865_5117"><rect width="70" height="40" fill="currentColor"></rect></clipPath></defs></svg></div><div class="trustedby-marquee__item"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 50 42" fill="none" class="trustedby-marquee__item-svg"><g clip-path="url(#clip0_865_5109)"><path d="M32.8229 6.46119C31.736 10.9843 34.564 15.3478 38.791 16.5171L38.7847 29.7539C38.6024 31.4589 37.6908 32.8742 36.1753 33.6986C31.3655 35.8913 26.6326 39.3399 21.8491 41.4483C19.9806 42.2716 18.5389 42.1361 16.7273 41.2794C11.8374 38.9658 7.08765 35.8059 2.20511 33.4172C1.07115 32.6533 0.350307 31.3964 0.136373 30.0603C0.446209 24.2356 -0.278849 17.9887 0.131104 12.2129C0.290237 9.96911 1.45265 9.0176 3.26213 7.96812C7.34585 5.60028 12.1768 2.96147 16.4175 0.897945C18.2143 0.023553 19.5654 -0.358928 21.5403 0.422709L32.8229 6.46119ZM12.3991 15.7366H9.71914V23.6384C9.71914 24.1553 10.2261 25.4445 10.4906 25.9343C12.7353 30.0958 18.8783 30.5001 21.7184 26.7399C22.2432 26.0458 23.0147 24.3856 23.0147 23.5363V15.7366H20.3347V23.0266C20.3347 24.9192 18.2027 26.6242 16.3669 26.6242C14.5964 26.6242 12.3991 24.9515 12.3991 23.1277V15.7355V15.7366ZM29.1998 15.7366H26.5198V28.7878H29.1998V15.7366Z" fill="currentColor"></path><path d="M41.6168 0.21875C37.2369 0.21875 33.6738 3.74237 33.6738 8.07369C33.6738 12.405 37.2369 15.9286 41.6168 15.9286C45.9966 15.9286 49.5598 12.405 49.5598 8.07369C49.5598 3.74237 45.9966 0.21875 41.6168 0.21875ZM39.3457 9.83498C39.1782 8.93662 39.4416 8.33319 40.2036 7.85379C39.2825 7.13051 39.2129 5.84967 40.2109 5.16183C41.7422 4.10505 44.458 5.23478 43.5844 7.192C43.4863 7.41086 42.9468 7.86942 43.0216 7.98302C43.5274 8.1185 43.8436 8.57602 43.9005 9.0721C44.223 11.8641 39.6956 11.7203 39.3447 9.83498H39.3457Z" fill="currentColor"></path><path d="M41.2384 8.52735C40.2879 8.69931 40.3796 9.9343 41.2226 10.0677C41.7612 10.1532 42.5811 10.0812 42.6685 9.41216C42.776 8.59196 41.8982 8.4075 41.2384 8.52735Z" fill="currentColor"></path><path d="M41.5767 7.45788C42.8498 7.50478 42.8846 5.54651 41.2353 5.91545C40.4407 6.09366 40.5693 7.42036 41.5767 7.45788Z" fill="currentColor"></path></g><defs><clipPath id="clip0_865_5109"><rect width="49.56" height="42" fill="currentColor"></rect></clipPath></defs></svg></div><div class="trustedby-marquee__item"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 159 40" fill="none" class="trustedby-marquee__item-svg"><path d="M84.3491 22.668V26.0967H80.6328V22.668H84.3491Z" fill="currentColor"></path><path d="M3.77339 26.0957V17.4373H0.0253906L0.0488964 14.9596H3.77339V14.22C3.75831 13.3522 4.03415 12.5012 4.56319 11.7835C5.08972 11.0707 5.83642 10.5163 6.80329 10.1201C7.84105 9.70777 8.962 9.50374 10.0918 9.52159C11.0822 9.51078 12.0684 9.64286 13.0147 9.91303C13.8197 10.1364 14.5662 10.5103 15.2078 11.0115C15.7884 11.4835 16.141 12.0163 16.2656 12.6098L12.6339 13.5022C12.4887 13.0759 12.1859 12.7102 11.7783 12.4688C11.3272 12.1957 10.7969 12.0554 10.2575 12.0665C9.5045 12.0665 8.92704 12.2914 8.52509 12.741C8.12314 13.1906 7.92256 13.7776 7.92334 14.502V14.9596H15.4452V17.4373H7.92334V26.0946L3.77339 26.0957Z" fill="currentColor"></path><path d="M18.4121 26.0955V9.95508H22.5374V26.0955H18.4121Z" fill="currentColor"></path><path d="M111.244 9.53125V13.0814H107.064V9.53125H111.244Z" fill="currentColor"></path><path d="M138.838 9.53125V13.0814H134.658V9.53125H138.838Z" fill="currentColor"></path><path d="M86.9512 26.0966V14.9604H91.1011V17.8534C91.3761 17.1825 91.8158 16.5794 92.3857 16.0914C92.9811 15.5883 93.678 15.1981 94.4366 14.9431C95.2865 14.6586 96.1852 14.5186 97.0892 14.5299C98.4878 14.5299 99.7136 14.809 100.767 15.367C101.81 15.9164 102.66 16.7305 103.216 17.7125C103.797 18.7195 104.087 19.8685 104.088 21.1596V26.0966H99.9628V21.268C99.9778 20.5012 99.7838 19.7432 99.3987 19.0635C99.0426 18.439 98.5039 17.9191 97.8438 17.5628C97.1469 17.1995 96.357 17.0156 95.5566 17.0304C94.7568 17.0191 93.9678 17.2027 93.2695 17.5628C92.5951 17.9168 92.0402 18.4363 91.6664 19.0635C91.2642 19.747 91.0617 20.5154 91.0788 21.2929V26.0998L86.9512 26.0966Z" fill="currentColor"></path><path d="M111.213 14.9609H107.064V26.0971H111.213V14.9609Z" fill="currentColor"></path><path d="M138.823 14.9609H134.674V30.4789H138.823V14.9609Z" fill="currentColor"></path><path d="M114.656 26.0976V14.9614H118.805V17.8544C119.08 17.1834 119.521 16.5803 120.091 16.0923C120.685 15.5893 121.381 15.1992 122.138 14.944C122.988 14.6597 123.886 14.5197 124.79 14.5309C126.188 14.5309 127.414 14.8099 128.468 15.368C129.512 15.9185 130.363 16.7341 130.92 17.7178C131.5 18.7248 131.791 19.8738 131.792 21.1649V26.1019H127.667V21.269C127.682 20.5023 127.488 19.7443 127.104 19.0645C126.748 18.4384 126.208 17.9172 125.546 17.5605C124.85 17.197 124.06 17.0131 123.261 17.0281C122.461 17.0167 121.672 17.2004 120.973 17.5605C120.299 17.9155 119.744 18.4362 119.372 19.0645C118.969 19.7479 118.766 20.5163 118.784 21.2939V26.1008L114.656 26.0976Z" fill="currentColor"></path><path d="M151.885 25.7497C150.596 26.2723 149.127 26.5337 147.477 26.5337C146.37 26.5486 145.268 26.4022 144.212 26.0999C143.244 25.8108 142.493 25.4193 141.96 24.9256C141.426 24.4318 141.159 23.8897 141.158 23.2991C141.158 22.6485 141.449 22.0467 142.03 21.4936C142.612 20.9406 143.424 20.4852 144.467 20.1274C145.619 19.7508 146.82 19.5131 148.038 19.4204L154.003 18.9866C154.224 18.9631 154.434 18.8885 154.615 18.7698C154.694 18.7229 154.759 18.6588 154.804 18.5831C154.85 18.5074 154.874 18.4225 154.875 18.336C154.875 18.1054 154.69 17.8846 154.321 17.6735C153.951 17.4631 153.449 17.3037 152.812 17.1942C152.124 17.0816 151.426 17.0272 150.726 17.0316C149.734 17.0332 148.743 17.1167 147.767 17.281C146.826 17.4334 145.903 17.6665 145.01 17.9771C144.168 18.2757 143.502 18.5984 143.012 18.9454L141.456 16.9231C142.082 16.4728 142.9 16.0629 143.907 15.6935C144.971 15.3084 146.073 15.0207 147.198 14.8347C148.361 14.6338 149.541 14.5318 150.724 14.53C152.128 14.5166 153.526 14.696 154.873 15.0624C156.126 15.4181 157.125 15.9241 157.867 16.5805C158.61 17.2369 158.979 18.0017 158.974 18.8749V26.0956H154.826V23.6623C154.154 24.532 153.174 25.2277 151.885 25.7497ZM145.731 23.4552C146.015 23.6374 146.419 23.774 146.945 23.8683C147.54 23.9684 148.145 24.016 148.749 24.0104C149.742 24.0199 150.732 23.8991 151.688 23.6515C152.575 23.4115 153.295 23.0887 153.845 22.6832C154.396 22.2776 154.726 21.828 154.835 21.3342V20.9005L148.87 21.3342C148.246 21.3819 147.627 21.4802 147.021 21.6281C146.566 21.728 146.137 21.9093 145.758 22.1616C145.46 22.3785 145.311 22.604 145.311 22.8361C145.311 23.0681 145.449 23.2741 145.731 23.4552Z" fill="currentColor"></path><path d="M48.7445 18.4196C49.3395 18.4321 49.9055 18.6589 50.3215 19.0516C50.7375 19.4442 50.9705 19.9715 50.9705 20.5206C50.9705 21.0696 50.7375 21.5969 50.3215 21.9895C49.9055 22.3822 49.3395 22.609 48.7445 22.6215H30.7414C30.1464 22.609 29.5803 22.3822 29.1643 21.9895C28.7483 21.5969 28.5154 21.0696 28.5154 20.5206C28.5154 19.9715 28.7483 19.4442 29.1643 19.0516C29.5803 18.6589 30.1464 18.4321 30.7414 18.4196H48.7445ZM48.7445 14.9498H30.7414C29.1419 14.9555 27.6098 15.5444 26.4791 16.588C25.3483 17.6317 24.7106 19.0455 24.7051 20.5211C24.7097 21.9983 25.3478 23.4137 26.4799 24.4582C27.612 25.5027 29.1462 26.0914 30.7472 26.0957H48.7445C50.3453 26.0911 51.8792 25.5023 53.011 24.4578C54.1429 23.4133 54.7808 21.9981 54.7855 20.5211C54.7818 19.0437 54.1442 17.6277 53.0122 16.5827C51.8802 15.5377 50.3458 14.9486 48.7445 14.9443V14.9498Z" fill="currentColor"></path><path d="M60.016 26.0968L56.9355 14.9443H61.0491L63.3996 24.402L65.7056 14.9443H71.4433L73.7939 24.5104L76.1222 14.9443H80.1898L77.2269 26.0968H70.7628L68.5979 16.6793L66.4107 26.0946L60.016 26.0968Z" fill="currentColor"></path></svg></div><div class="trustedby-marquee__item"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 277 65" fill="none" class="trustedby-marquee__item-svg"><path d="M177.219 53.9778C174.491 50.7426 171.108 38.5148 167.397 36.157C167.124 35.9376 166.852 35.9925 166.579 36.2118C165.597 36.9246 163.414 38.5148 163.578 38.131C164.887 36.1021 168.434 33.5798 170.453 32.0993V16.1976C171.326 14.8816 173.127 13.127 174 12.5238C175.2 10.824 177.71 8.68546 177.819 8.74029C180.056 10.4401 182.184 11.3723 183.712 11.3723C185.294 11.3723 186.931 9.34346 186.604 10.0563C185.622 11.7013 182.402 15.3203 180.384 15.3203C178.583 15.3203 177.001 14.443 174.327 12.8528V28.0965C174.436 27.932 176.673 25.3 178.037 24.4775L186.768 32.867C186.167 33.7443 185.349 34.6216 184.476 35.499V45.8625C184.476 46.0818 177.328 54.1423 177.219 53.9778ZM170.78 31.9896C173.836 33.6895 177.819 45.4238 180.602 49.0428V34.5668L174.272 28.4255C174.054 28.919 171.544 31.3865 170.78 31.9896ZM193.563 52.936L190.016 49.3718C189.962 49.317 191.326 47.7816 191.817 47.2881V24.8613H186.579C186.524 24.5871 189.907 21.023 190.398 21.023H191.817V16.9105C191.817 16.5815 195.636 12.3593 195.636 13.2366V21.023H200.82C200.82 21.5165 197.164 24.8613 197 24.8613H195.636V47.2881L197.437 49.0976C197.655 49.317 193.781 53.1553 193.563 52.936ZM211.137 52.936C203.825 49.8105 209.391 52.2231 202.079 49.0976C201.97 49.0976 203.389 47.4526 204.098 46.7398V25.6838L202.298 23.8743C202.079 23.655 205.844 19.8166 206.172 19.9811C206.772 20.5295 208.954 22.6131 209.718 23.5453C209.773 23.655 208.409 25.1903 207.918 25.6838V46.027L214.302 48.7686V25.6838L212.501 23.8743C212.283 23.655 216.048 19.8166 216.375 19.9811C216.975 20.5295 219.158 22.6131 219.922 23.5453C219.976 23.655 218.612 25.1903 218.121 25.6838V45.9173L220.958 48.8235C221.777 47.5623 222.05 45.3141 221.449 43.9981C221.177 42.9015 221.722 43.395 221.886 43.9981C223.414 49.0976 217.685 53.4295 217.303 52.936C215.993 51.5651 215.775 51.1813 214.411 49.9201C213.156 51.4006 211.246 52.9908 211.137 52.936ZM233.662 52.936L232.516 52.4425L227.66 50.4136L224.604 49.0976C224.495 48.988 225.914 47.4526 226.623 46.7398V27.3288C226.623 27.0546 229.46 24.1485 230.224 23.5453C228.042 22.4486 225.859 21.2971 222.203 19.378C221.821 19.1586 221.385 18.8845 221.112 18.5006C220.566 17.8426 220.566 16.9105 220.73 16.1428C221.003 14.8816 223.022 11.5916 224.386 10.495C224.877 10.1111 226.35 8.95963 225.313 10.5498C224.768 11.4271 223.949 13.2366 224.713 14.2785C225.75 15.6493 238.791 22.0648 240.264 22.7228C240.919 23.0518 242.174 23.1615 242.938 22.9421C243.92 22.668 243.756 22.9421 243.483 23.2711C242.883 23.9291 241.683 25.1903 240.646 26.1225V46.027C240.646 46.2463 238.027 49.0428 237.045 49.7556C236.444 50.5233 233.771 52.9908 233.662 52.936ZM230.442 46.0818L236.826 48.7686V26.7805C236.39 26.616 232.134 24.5323 230.442 23.7098V46.0818ZM245.998 19.049C245.889 18.72 250.745 13.0721 252.218 12.4141C253.255 11.9755 254.619 12.9076 255.383 13.6753C255.601 13.8946 251.618 17.6233 251.509 17.5136C250.964 16.9653 249.818 16.3073 249.054 16.2525C248.344 17.075 246.053 19.1586 245.998 19.049ZM246.708 49.3718C246.653 49.317 248.017 47.7816 248.508 47.2881V25.6838L246.708 23.8743C246.489 23.655 250.254 19.8166 250.582 19.9811C251.182 20.5295 253.364 22.6131 254.128 23.5453C254.183 23.655 252.819 25.1903 252.328 25.6838V47.2881L254.128 49.0976C254.183 49.1525 250.363 53.0456 250.254 52.936C250.09 52.8263 249.981 52.6618 246.708 49.3718ZM257.705 49.0976C258.141 48.33 258.96 47.5075 259.724 46.7398V27.3288C259.724 26.8901 262.943 23.7646 263.488 23.4356C264.416 22.2293 266.926 19.9811 267.09 20.036L276.147 23.8743C275.383 24.8613 274.674 25.6838 273.746 26.5611V46.027C272.983 47.2881 271.728 48.5493 270.145 49.7556C269.763 50.2491 267.09 53.0456 266.762 52.936C263.761 51.7296 260.706 50.4685 257.705 49.0976ZM263.543 46.0818L269.927 48.7686V26.7256C265.344 24.8065 264.471 24.4775 263.543 24.0936V46.0818Z" fill="currentColor"></path><path d="M1.4624 51.8943V14.7143H7.4424L19.5064 45.6023H19.6104L31.5704 14.7143H37.6544V51.8943H33.1824V21.3183H33.0784C33.0784 21.3183 32.0904 24.2303 31.4144 25.9983L21.2224 51.8943H17.6344L7.4424 25.9983C6.7144 24.1263 5.7784 21.3183 5.7784 21.3183H5.6744V51.8943H1.4624Z" fill="currentColor"></path><path d="M65.1145 52.1543C62.3585 52.1543 60.9025 50.9063 60.4865 48.1503H60.4345C58.8225 50.2303 56.0665 52.4143 51.4905 52.4143C46.3945 52.4143 42.3905 50.0223 42.3905 44.9263C42.3905 38.5823 47.3825 37.2823 54.0905 36.2423C57.8865 35.6703 60.5385 35.3063 60.5385 32.3943C60.5385 29.3783 58.3545 27.6623 54.5065 27.6623C50.1385 27.6623 47.9545 29.5343 47.7985 33.5903H43.7425C43.8985 28.3903 47.3305 24.4903 54.4545 24.4903C60.1745 24.4903 64.3865 26.6223 64.3865 33.0183V45.8103C64.3865 47.9943 64.9065 49.1903 67.2465 48.6703H67.4025V51.7383C66.8825 51.9463 66.2065 52.1543 65.1145 52.1543ZM52.4265 49.1903C58.0425 49.1903 60.5905 45.0823 60.5905 41.9623V37.3863C59.1865 38.2703 56.7425 38.9463 54.4545 39.3623C50.2425 40.1423 46.8625 40.8703 46.8625 44.8223C46.8625 48.4103 49.6705 49.1903 52.4265 49.1903Z" fill="currentColor"></path><path d="M70.6663 51.8943V14.7143H74.8783V51.8943H70.6663Z" fill="currentColor"></path><path d="M87.4241 51.8943L78.0121 25.0103H82.5361L88.1001 42.0663C88.8801 44.4583 89.8681 47.7343 89.8681 47.7343H89.9721C89.9721 47.7343 90.9601 44.4063 91.7401 42.0663L97.4081 25.0103H101.776L92.1041 51.8943H87.4241Z" fill="currentColor"></path><path d="M125.087 52.1543C122.331 52.1543 120.875 50.9063 120.459 48.1503H120.407C118.795 50.2303 116.039 52.4143 111.463 52.4143C106.367 52.4143 102.363 50.0223 102.363 44.9263C102.363 38.5823 107.355 37.2823 114.063 36.2423C117.859 35.6703 120.511 35.3063 120.511 32.3943C120.511 29.3783 118.327 27.6623 114.479 27.6623C110.111 27.6623 107.927 29.5343 107.771 33.5903H103.715C103.871 28.3903 107.303 24.4903 114.427 24.4903C120.147 24.4903 124.359 26.6223 124.359 33.0183V45.8103C124.359 47.9943 124.879 49.1903 127.219 48.6703H127.375V51.7383C126.855 51.9463 126.179 52.1543 125.087 52.1543ZM112.399 49.1903C118.015 49.1903 120.563 45.0823 120.563 41.9623V37.3863C119.159 38.2703 116.715 38.9463 114.427 39.3623C110.215 40.1423 106.835 40.8703 106.835 44.8223C106.835 48.4103 109.643 49.1903 112.399 49.1903Z" fill="currentColor"></path><path d="M134.695 14.7143V28.5463H134.799C136.723 25.9983 139.427 24.3863 143.327 24.3863C148.943 24.3863 152.375 27.4543 152.375 33.0183V51.8943H148.163V33.3823C148.163 29.8983 145.875 27.9223 142.079 27.9223C137.815 27.9223 134.695 30.9383 134.695 35.3583V51.8943H130.483V14.7143H134.695Z" fill="currentColor"></path><path d="M157.384 51.8943V46.7463H162.428V51.8943H157.384Z" fill="currentColor"></path></svg></div><div class="trustedby-marquee__item"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 100 44" fill="none" class="trustedby-marquee__item-svg"><path d="M86.3336 11C86.9446 11 87.4676 11.2017 87.9035 11.6061C88.3394 12.0104 88.5569 12.5002 88.5569 13.0747C88.5569 13.6492 88.3394 14.1391 87.9035 14.5434C87.4676 14.9477 86.9446 15.1494 86.3336 15.1494C85.7225 15.1494 85.2011 14.9477 84.7703 14.5434C84.3394 14.1391 84.1235 13.6492 84.1235 13.0747C84.1235 12.5002 84.3394 12.0104 84.7703 11.6061C85.202 11.2017 85.7225 11 86.3336 11Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M6.85845 12.1055L0 32.1818H4.54047L6.03155 27.5201H13.1631L14.7132 32.1818H19.281L12.2482 12.1055H6.85845ZM7.06185 24.2997L7.63968 22.494C8.0083 21.2727 8.37858 19.9137 8.75135 18.4185C8.99294 17.4488 9.24699 16.4201 9.51349 15.335C9.78912 16.411 10.0556 17.4297 10.3147 18.3911C10.714 19.878 11.1075 21.2453 11.4936 22.494L12.0938 24.2997H7.06185Z" fill="currentColor"></path><path d="M31.1895 24.9122C30.4797 24.2431 29.3971 23.7599 27.9425 23.4635L25.2343 22.9247C24.5245 22.781 24.0239 22.5793 23.7325 22.3186C23.4402 22.0579 23.2941 21.7391 23.2941 21.3622C23.2941 20.8956 23.5183 20.5221 23.9674 20.2439C24.4166 19.9658 24.9736 19.8263 25.6387 19.8263C26.3751 19.8263 26.9612 19.9907 27.3971 20.3178C27.8329 20.6458 28.1268 21.0658 28.2796 21.578L31.8636 20.9446C31.6835 20.1277 31.3248 19.4179 30.786 18.8159C30.2472 18.214 29.5415 17.7491 28.6706 17.4212C27.7989 17.0932 26.7711 16.9297 25.5847 16.9297C24.3095 16.9297 23.1995 17.1181 22.2563 17.4959C21.3132 17.8728 20.5768 18.41 20.0463 19.1057C19.5166 19.8022 19.2509 20.635 19.2509 21.6054C19.2509 22.7287 19.6104 23.647 20.3286 24.3609C21.0475 25.0749 22.1343 25.5805 23.5897 25.8769L26.1899 26.4157C26.8458 26.5502 27.3331 26.7437 27.6519 26.9952C27.9707 27.2468 28.1301 27.5706 28.1301 27.9649C28.1301 28.4141 27.9076 28.7844 27.4635 29.0766C27.0185 29.3688 26.4099 29.5149 25.6378 29.5149C24.8109 29.5149 24.1509 29.3398 23.6569 28.9894C23.1629 28.6391 22.8167 28.1135 22.6191 27.4128L18.8599 28.0596C19.0301 28.9936 19.412 29.7914 20.0048 30.4514C20.5976 31.1115 21.3614 31.6146 22.2954 31.9608C23.2294 32.3061 24.3028 32.4797 25.5158 32.4797C26.8367 32.4797 28.0015 32.2729 29.0127 31.8595C30.023 31.446 30.8159 30.869 31.3912 30.1285C31.9658 29.3871 32.2538 28.5228 32.2538 27.5349C32.2538 26.4572 31.8985 25.583 31.1895 24.9139V24.9122Z" fill="currentColor"></path><path d="M47.2119 17.1175H42.537L37.6054 22.9116H37.3763V12.1055H33.334V32.1818H37.3763V27.3508L38.532 26.0473L42.7387 32.1818H47.495L41.5797 23.6596L47.2119 17.1175Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M64.3821 12.9747C63.3128 12.3952 62.0152 12.1055 60.4884 12.1055H52.6602V32.1818H56.7698V25.6198H60.3946C61.9396 25.6198 63.253 25.335 64.3356 24.7638C65.4182 24.1934 66.2443 23.4031 66.8147 22.3927C67.385 21.3823 67.6698 20.2126 67.6698 18.8826C67.6698 17.5525 67.3892 16.3919 66.8279 15.3724C66.2667 14.3529 65.4514 13.5542 64.3821 12.9747ZM63.028 20.6617C62.7632 21.1739 62.3589 21.5758 61.8151 21.868C61.2713 22.1602 60.5772 22.3063 59.7329 22.3063H56.7682V15.5011H59.7188C60.5631 15.5011 61.2597 15.6422 61.8076 15.9253C62.3555 16.2084 62.7615 16.6036 63.0272 17.1109C63.292 17.6181 63.4249 18.2092 63.4249 18.8826C63.4249 19.5559 63.292 20.1495 63.0272 20.6609L63.028 20.6617Z" fill="currentColor"></path><path d="M80.0738 17.6098C79.2967 17.1565 78.3876 16.929 77.3448 16.929C76.0696 16.929 75.0294 17.2728 74.2257 17.9602C73.6163 18.4807 73.1248 19.1657 72.7504 20.0141V12.1055H68.7886V32.1818H72.8309V23.4637C72.8309 22.7904 72.9546 22.22 73.2012 21.7526C73.4478 21.2852 73.794 20.9282 74.239 20.6816C74.684 20.4342 75.1888 20.3114 75.755 20.3114C76.6084 20.3114 77.2751 20.5762 77.7558 21.1067C78.2365 21.6364 78.4764 22.3686 78.4764 23.3026V32.1818H82.5321V22.6019C82.5321 21.4255 82.3162 20.4126 81.8853 19.5633C81.4544 18.7148 80.8509 18.0631 80.0738 17.6098Z" fill="currentColor"></path><path d="M88.3553 17.1172H84.313V32.1815H88.3553V17.1172Z" fill="currentColor"></path><path d="M94.1777 12.1055H90.1353V32.1818H94.1777V12.1055Z" fill="currentColor"></path><path d="M99.9999 12.1055H95.9575V32.1818H99.9999V12.1055Z" fill="currentColor"></path></svg></div></div></div></div></div></div></div></section>`;

// Replace class with className
function convertHtmlToJsx(html) {
  let jsx = html.replace(/class=/g, 'className=');

  // Fix inline styles
  jsx = jsx.replace(/style="([^"]*)"/g, (match, styles) => {
    if (!styles.trim()) return 'style={{}}';
    let parts = styles.split(';').filter(Boolean);
    let obj = {};
    for (let part of parts) {
      let [key, ...vals] = part.split(':');
      if (vals.length === 0) continue;
      key = key.trim();
      let value = vals.join(':').trim();
      if (key === '--y') {
        obj[key] = value;
      } else {
        // camelCase key
        let camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        obj[camelKey] = value;
      }
    }
    return 'style={' + JSON.stringify(obj) + ' as React.CSSProperties}';
  });

  // Self closing tags
  jsx = jsx.replace(/<(img|path|circle|line|rect)([^>]*?)(?<!\/)>/g, '<$1$2 />');

  // Specific react attribute naming
  jsx = jsx.replace(/playsinline=""/g, 'playsInline');
  jsx = jsx.replace(/stroke-width=/g, 'strokeWidth=');
  jsx = jsx.replace(/stroke-linecap=/g, 'strokeLinecap=');
  jsx = jsx.replace(/stroke-linejoin=/g, 'strokeLinejoin=');
  jsx = jsx.replace(/fill-rule=/g, 'fillRule=');
  jsx = jsx.replace(/clip-rule=/g, 'clipRule=');
  jsx = jsx.replace(/clip-path=/g, 'clipPath=');

  return jsx;
}

let jsx1 = convertHtmlToJsx(sliderHtml);
let jsx2 = convertHtmlToJsx(infoHtml);

let output = \`import React from 'react';

export default function LightProductSlider() {
  return (
    <>
      \${jsx1}
      \${jsx2}
    </>
  );
}
\`;

fs.writeFileSync('d:/Softree_Projects/SOFTREE/src/components/homepage-light/LightProductSlider.tsx', output, 'utf-8');
console.log('Conversion successful!');
