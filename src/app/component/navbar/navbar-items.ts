interface NavbarItem {
  id: number;
  label: string;
  link: string;
  external?: boolean;
}

export const navbarLinks: NavbarItem[] = [
  { id: 1, label: 'Home', link: '/home' },
  { id: 2, label: 'Blog', link: '/blog' },
  { id: 3, label: 'About Me', link: '/about-me' },
  { id: 4, label: 'Porfolio', link: '/portfolio' },
  {
    id: 5,
    label: 'GitHub',
    link: 'https://github.com/computebender',
    external: true,
  },
  {
    id: 6,
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/benjamin-munro-114583182/',
    external: true,
  },
];
