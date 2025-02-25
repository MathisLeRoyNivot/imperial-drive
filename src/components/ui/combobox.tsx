"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxElement {
	value: string;
	label: string;
}

interface ComboboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
	comboboxElements: ComboboxElement[];
	placeholder: string;
}

export function Combobox({
	comboboxElements,
	placeholder,
	value: controlledValue,
	onChange,
	...props
}: ComboboxProps) {
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = React.useState<string>(
		(controlledValue as string) || ""
	);

	// Sync internal state with controlled value
	React.useEffect(() => {
		setSelected((controlledValue as string) || "");
	}, [controlledValue]);

	const handleSelect = (currentValue: string) => {
		const newValue = currentValue === selected ? "" : currentValue;
		setSelected(newValue);
		onChange && onChange(newValue);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between">
					{selected
						? comboboxElements.find(
								(element) => element.value === selected
						  )?.label
						: placeholder}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command>
					<CommandInput placeholder={placeholder} className="h-9" />
					<CommandList>
						<CommandEmpty>No element found.</CommandEmpty>
						<CommandGroup>
							{comboboxElements.map((element) => (
								<CommandItem
									key={element.value}
									value={element.value}
									onSelect={handleSelect}>
									{element.label}
									<Check
										className={cn(
											"ml-auto",
											selected === element.value
												? "opacity-100"
												: "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
