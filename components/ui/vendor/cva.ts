import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type VariantsConfig = Record<string, Record<string, string>>;
type DefaultVariants = Record<string, string | number | boolean | undefined>;
type Props = Record<string, any>;

type CompoundVariant = {
	class?: string;
	className?: string;
} & Record<string, string | number | boolean | undefined>;

export type CvaOptions = {
	variants?: VariantsConfig;
	defaultVariants?: DefaultVariants;
	compoundVariants?: CompoundVariant[];
};

export type VariantProps<T extends (props?: any) => string> = NonNullable<Parameters<T>[0]>;

/**
 * Minimal CVA: returns a function that builds className from base + variant values.
 */
export function cva<TVariants extends VariantsConfig = VariantsConfig>(
	base?: string,
	options?: CvaOptions & { variants?: TVariants }
) {
	const { variants, defaultVariants, compoundVariants } = options ?? {};

	return function build(props?: Props) {
		const all = { ...(defaultVariants ?? {}), ...(props ?? {}) };
		const parts: Array<string | undefined> = [base];

		// simple variants
		if (variants) {
			for (const key of Object.keys(variants)) {
				const v = all[key];
				if (v !== undefined && v !== null) {
					const map = variants[key];
					const cls = map?.[String(v)];
					if (cls) parts.push(cls);
				}
			}
		}

		// compound variants
		if (compoundVariants && compoundVariants.length) {
			for (const cv of compoundVariants) {
				const { class: c1, className: c2, ...conds } = cv;
				const match = Object.entries(conds).every(([k, v]) => all[k] === v);
				if (match) parts.push(c1 || c2);
			}
		}

		// allow passing class / className at call-site
		if (all.class) parts.push(String(all.class));
		if (all.className) parts.push(String(all.className));

		return twMerge(clsx(parts));
	};
}
