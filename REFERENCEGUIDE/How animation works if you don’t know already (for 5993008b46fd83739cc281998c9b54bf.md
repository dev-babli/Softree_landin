# How animation works if you don’t know already (for beginners)

### How UI animation really works (any tool)

**In one line:** Animation = **Before state → (tween with a curve) → After state.**

The tool auto-fills the in-between frames (“tweening”) based on your **duration** and **easing curve**.

**What actually changes:** position, size, rotation, opacity, color, blur, corner radius, shadows, masks, layout/auto-layout values, etc. You edit these between the two states—everything else is calculated.

**The curve (easing):**

- **Ease-out** = fast start, soft landing (great for entrances/feedback)
- **Ease-in** = soft start, fast exit (great for items leaving)
- **Ease-in-out** = gentle both ends (page/screen transitions)
    
    Pick a default, then adjust when needed.
    

**Identity matters (so tween works):**

- **Figma:** same **layer names/structure** (or component/variant) in both states → Smart Animate matches them.
- **After Effects:** two **keyframes** on the same property; Graph Editor shapes the curve.
- **ProtoPie:** **Trigger → Response** links (tap/drag → change property) with easing.

**Quick duration defaults (tweak per project):**

- Micro (hover/press): **150–200ms**
- UI state change (toggle/card): **200–300ms**
- Modal/page transition: **250–400ms**
- Sequenced flows (loading → success): **800–1200ms** total, in parts

---

### Mini recipe (works in Figma, AE, ProtoPie)

1. **Design the after state** (what you want users to see).
2. **Duplicate** to make the **before state**; change properties (e.g., move text down 16px, reduce opacity, outline button).
3. **Connect** the states.
4. Set **duration + easing** → **preview** → tweak until it feels natural.
5. If multiple elements appear, **stagger** by 50–150ms for a guided, premium feel.

**Hero section example:**

- After state: headline at rest, CTA **filled**, image in place.
- Before state: headline **16–24px lower & 0%→100% opacity**, CTA **outline**, image slightly scaled down/blurred.
- Connect with Smart Animate (300ms ease-out) → headline floats up, CTA fills, image sharpens—clean, modern entrance.

**Common pitfalls to avoid:**

- Layers renamed/reordered → tool can’t match → it **fades** instead of morphs.
- Changing too many properties at once → looks noisy.
- Durations too long → feels sluggish; too short → feels snappy/harsh.
- No hierarchy/stagger → everything competes for attention.

**Bottom line:** always think **two clear states + a curve**. Define what changes, keep identity consistent, and let the tool do the in-betweens.