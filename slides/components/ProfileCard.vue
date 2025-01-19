<script setup>
const ProfileCard = {
    props: {
        name: String,
        website: String,
        linkedin: String,
        github: String,
        placeholderImage: String,
    },
    template: `
    <div class="rounded-lg border border-gray-300 shadow-md p-4 text-center hover:(shadow-lg border-gray-400) transition-all">
      <img :src="placeholderImage" alt="Profile Picture" class="w-24 h-24 mx-auto rounded-full object-cover mb-4" />
      <h3 class="text-lg font-semibold mb-2">{{ name }}</h3>
      <div class="flex flex-col gap-2">
        <a v-if="website" :href="website" target="_blank" class="text-blue-500 hover:text-blue-700 text-sm font-medium">
          🌐 Website
        </a>
        <a v-if="linkedin" :href="linkedin" target="_blank" class="text-blue-500 hover:text-blue-700 text-sm font-medium">
          🔗 LinkedIn
        </a>
        <a v-if="github" :href="github" target="_blank" class="text-blue-500 hover:text-blue-700 text-sm font-medium">
          💻 GitHub
        </a>
      </div>
    </div>
  `,
};
</script>

<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        <ProfileCard name="Aashna Verma" website="https://aashna-verma.github.io/"
            github="https://github.com/Aashna-Verma"
            placeholderImage="https://lh3.googleusercontent.com/pw/AP1GczPnBFA29FY5cEvpxDMzb0rnTvbdywy16kJirlRUMfi7PGCI1SjER-sMPnJBSlAENzJe-CMQfCZvW83maSGDL5UIaRaKayf_o3hTkfQLwaxF7W3H7F1SHQ3N_kMkKW6Jgat1BRwKYBtUmRRSZ5P_pLDy=w613-h920-s-no-gm?authuser=0" />
        <ProfileCard name="Lily Salem" linkedin="https://www.linkedin.com/in/lily-s-396190262/"
            github="https://github.com/lilysalem"
            placeholderImage="https://lh3.googleusercontent.com/pw/AP1GczPaA1DMXJzWJwJSnF55TbKfP1-picLG0qlt8rDSq6ygR7u-gDfTP4ljEnlVC9C12NoR25t47xSlmLmFkG6TRtuvZGgfzpVdm96pU5SjBmNoNm4F-Ro0icEkZQvsuw_4C7auN9oIU_ihx2rbuKhqO4b1=w642-h920-s-no-gm?authuser=0" />
        <ProfileCard name="Hasith De Alwis" website="https://hasithdev.com/"
            linkedin="https://www.linkedin.com/in/hasith-de-alwis/" github="https://github.com/HasithDeAlwis"
            placeholderImage="https://lh3.googleusercontent.com/pw/AP1GczPvNrBhbm4qKthN16w7uBgmQXxLowqA04GLe7BhhF2pQ_nO6UEzJl-8is_C63omPxR1RNkGZzRgasuqxGDM8qZ2ZX1qIguJ6HDJB4gFQkyP8rbxa4P5qL63JEbwrtc5mRO2JnMC_tukw6e0XGg5GBhm=w613-h920-s-no-gm?authuser=0" />
        <ProfileCard name="Mumtahin Farabi" linkedin="https://www.linkedin.com/in/mfarabi/"
            github="https://github.com/mfarabi619"
            placeholderImage="https://lh3.googleusercontent.com/pw/AP1GczMXoQvW0q0xYVsAQX3nVy8h-yDvctS4giyfyT564rGYryqv6MuA2MlnBOEDIA9VRFC-C95h58Z-uTVMbDmW6gO3DO-r-s9cmkXRuPyFjVkNlxtvHu4PtFwsf46ZzFNEEdN0SKzWJsAplkyjhg503DTI=w613-h920-s-no-gm?authuser=0" />
    </div>
</template>
