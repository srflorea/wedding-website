import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ro', 'cs', 'en'],
  defaultLocale: 'ro'
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
