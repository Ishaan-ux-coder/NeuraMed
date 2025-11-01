import React from "react";
import { clsx } from "clsx";

type SlotProps = React.HTMLAttributes<HTMLElement> & {
	children?: React.ReactNode;
};

export function Slot({ children, className, ...rest }: SlotProps) {
	if (React.isValidElement(children)) {
		const child = children as React.ReactElement<any>;
		return React.cloneElement(child, {
			...rest,
			className: clsx(child.props?.className, className),
		});
	}
	return null;
}
