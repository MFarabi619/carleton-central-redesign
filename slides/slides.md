---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: cuNext
info: |
  ## Pitch Deck for cuNext at uOttaHack 7.
  Submitted for the Gadget challenge, and best UI/UX.
  By Aashna Verma, Lily Salem, Hasith De Alwis, and Mumtahin Farabi.

# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# cuNext

The portal you need, built by students who get It.

<!-- <div @click="$slidev.nav.next" class="mt-12 py-1" hover:bg="white op-10"> -->
<!--   Press Space for next page <carbon:arrow-right /> -->
<!-- </div> -->

<div class="abs-br m-6 text-xl">
  <button @click="$slidev.nav.openInEditor" title="Open in Editor" class="slidev-icon-btn">
    <carbon:edit />
  </button>
  <a href="https://github.com/MFarabi619/carleton-central-redesign" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
transition: fade-out
---

#  What is cuNext?

Slidev is a slides maker and presenter designed for developers, consist of the following features

- 🌟 **Student-Centered Design** - Built with a deep understanding of student needs and frustrations.
- ⚡ **Seamless Navigation** - Find what you need in seconds with an intuitive, user-friendly interface.
- 📲‍ **Modern & Responsive** - Accessible on any device, ensuring a consistent experience anywhere.
- 🔔 **Real-Time Updates** - embed Vue components to enhance your expressions
- 🎓 **Personalized Dashboard** - Tailored insights and resources 
- 🔗  **Integrated Systems** - Smoothly connects with existing university tools and resources.
- 🌱 **Built to Evolve** - A scalable platform designed to grow with Carleton’s needs.
</br>
</br>

cuNext is more than a portal—it’s a bold step toward a smarter, more connected campus.

<!--
You can have `style` tag in markdown to override the style for the current page.
Learn more: https://sli.dev/features/slide-scope-style
-->

<style>
h1 {
  background-color: #2B90B6;
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
}
</style>

<!--
Here is another comment.
-->

---
transition: fade-out
---

# 👋 Meet the Team

<!-- ./components/Counter.vue -->
<ProfileCard />

---
transition: fade-out
---

# 🌟 Inspiration

Carleton Central is potato. Need it to be less potato.

---
transition: fade-out
---

# Metrics

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" class="rounded-2" src="https://embed.figma.com/design/yCW89M8HS3Rq4oxdHOkDHF/%E2%9C%A8-cuNext?node-id=230-3181&embed-host=share" allowfullscreen></iframe>

---
transition: fade-out
---

# 🚀 What it does

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" class="rounded-2"    src="https://embed.figma.com/design/yCW89M8HS3Rq4oxdHOkDHF/%E2%9C%A8-cuNext?node-id=23-148&embed-host=share" allowfullscreen></iframe>

---
transition: fade-out
---

# Navigation

Hover on the bottom-left corner to see the navigation's controls panel, [learn more](https://sli.dev/guide/ui#navigation-bar)

[Dorahacks Submission](https://dorahacks.io/buidl/21560/)

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="350" class="rounded-2" src="https://carleton-central-redesign.gadget.app" allowfullscreen></iframe>

---

# 🛠️ How we built it

- Remix
- React
- TypeScript
- Shadcn
- Tailwind CSS
- Gadget
- Figma
- Lots of love & good music

---
transition: fade-out
---

# 🤔 Challenges we ran into
- Reading lots of docs and learning Gadget CLI quickly from scratch.
- Seeding the database with mock data.
- Creating a design system from scratch.
- Collecting user pain points.
- Prioritizing features to work on.
- Improperly scaffolding Gadget project with Git, leading to conflicts later down the line.

---
transition: fade-out
---

# 🏆 Accomplishments that we're proud of
- Project managing really well and distributing areas of ownership early.
- Limiting scope early on, and adding features progressively only as required.
- Communicating blockers in a timely manner to adjust priorities.

---
transition: fade-out
---

# 🧠 What we learned
- UX research is hard.
- Creating user personas is hard.
- Debugging is hard and stressful.
- Gadget is awesome.
- Regardless of how good the tool is, you still need to fundamentally solve the problem first.

---
transition: fade-out
---

# 🔮 What's next for the project
- Raising awareness of the tool's existence
  - Could use instagram, tiktok, cuHacking docs site, word of mouth, posters etc.
- Rather than approach Carleton now, let students begin using it, and provide their thoughts.
  - Build up traction to draw Carleton University's attention, let budget be allocated, and be hired into the department directly to integrate the tool directly with their back-end.
- Could develop a browser extension to re-write and re-style the html.

---
transition: slide-up
level: 2
---

---
layout: center
class: text-center
---

# Thank you :)

 [GitHub](https://github.com/MFarabi619/carleton-central-redesign/tree/main)

<PoweredBySlidev mt-10 />
