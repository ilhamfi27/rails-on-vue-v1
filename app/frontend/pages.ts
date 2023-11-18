import Layout from './Layouts/Main.vue'; // This line

const pages = (import.meta as any).env.SSR
  ? (import.meta as any).globEagerDefault('./Pages/**/*.vue', { eager: true })
  : (import.meta as any).glob('./Pages/**/*.vue', { eager: true });

export async function resolvePage(name: string) {
  const page = pages[`./Pages/${name}.vue`];

  if (!page) {
    throw new Error(
      `Unknown page ${name}. Is it located under Pages with a .vue extension?`
    );
  }

  page.default.layout = page.default.layout || Layout; // This line
  console.log('SSR TEST', (import.meta as any).env.SSR);
  return (import.meta as any).env.SSR ? page : (await page).default;
}
