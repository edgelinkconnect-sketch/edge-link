import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-CiSvnN9i.mjs";
import { B as Mail, E as Phone, F as MessageCircle, _t as ChevronDown, dt as Clock, ht as ChevronUp, v as Send, vt as Check, z as MapPin } from "../_libs/lucide-react.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as AppShell } from "./router-s5e8-avL.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { t as Textarea } from "./textarea-kko37XEX.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { n as useForm, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-CdzxhzMv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var WHATSAPP_NUMBER = "250791900016";
var schema = objectType({
	full_name: stringType().trim().min(2, "Full name required").max(120),
	email: stringType().trim().email("Invalid email").max(255),
	phone: stringType().trim().min(4, "Phone required").max(40),
	nationality: stringType().optional(),
	country_residence: stringType().optional(),
	adults: stringType().min(1, "Required"),
	children: stringType().optional(),
	children_ages: stringType().optional(),
	travel_dates: stringType().min(1, "Required"),
	destinations: stringType().min(1, "Choose a destination"),
	duration: stringType().optional(),
	budget: stringType().optional(),
	accommodation: stringType().optional(),
	travel_style: stringType().optional(),
	dietary: stringType().optional(),
	mobility: stringType().optional(),
	occasion: stringType().optional(),
	notes: stringType().max(2e3).optional(),
	referral: stringType().optional(),
	contact_method: stringType().optional()
});
function buildWhatsAppMessage(d) {
	const line = (label, val) => val && val.trim() ? `• ${label}: ${val}` : "";
	return [
		`🦍 *NEW SAFARI INQUIRY - EDGELINK TRAVEL*`,
		`━━━━━━━━━━━━━━━━━━━━━━`,
		``,
		`👤 *GUEST DETAILS*`,
		line("Name", d.full_name),
		line("Email", d.email),
		line("Phone", d.phone),
		line("Nationality", d.nationality),
		line("Residence", d.country_residence),
		``,
		`👥 *TRAVEL DETAILS*`,
		line("Adults", d.adults),
		line("Children", `${d.children || "0"}${d.children_ages ? ` (Ages: ${d.children_ages})` : ""}`),
		line("Travel Dates", d.travel_dates),
		line("Duration", d.duration ? `${d.duration} days` : ""),
		line("Destinations", d.destinations),
		``,
		`💰 *BUDGET & PREFERENCE*`,
		line("Budget Range", d.budget),
		line("Accommodation", d.accommodation),
		line("Travel Style", d.travel_style),
		``,
		`🏨 *SPECIAL REQUIREMENTS*`,
		line("Dietary", d.dietary),
		line("Mobility", d.mobility),
		line("Occasion", d.occasion),
		line("Notes", d.notes),
		``,
		`📊 *LEAD SOURCE*`,
		line("Referral", d.referral),
		line("Contact Method", d.contact_method),
		``,
		`━━━━━━━━━━━━━━━━━━━━━━`,
		`✅ *ACTION ITEMS*`,
		`□ Review availability`,
		`□ Prepare custom itinerary`,
		`□ Send quote within 24 hours`,
		``,
		`📱 Reply: +250791900016`,
		`✉️ Email: info@edgelinktours.com`
	].filter((s) => s !== "").join("\n").replace(/\n(?=•)/g, "\n");
}
function Contact() {
	const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
		resolver: u(schema),
		defaultValues: {
			adults: "2",
			children: "0"
		}
	});
	async function onSubmit(data) {
		const msg = buildWhatsAppMessage(data);
		const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
		window.open(url, "_blank", "noopener,noreferrer");
		toast.success("Opening WhatsApp — tap Send to submit your inquiry.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b border-border bg-forest-deep py-16 text-primary-foreground md:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 md:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold",
					children: "Contact & booking"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-bold md:text-5xl",
					children: "Plan Your Adventure"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-primary-foreground/80",
					children: "Complete the form below — we'll open WhatsApp with a formatted inquiry. Just tap send and a specialist will respond within 24 hours."
				})
			]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1fr_360px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit(onSubmit),
			className: "space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 font-display text-lg font-bold text-forest",
					children: "Personal Details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full Name *",
							error: errors.full_name?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("full_name") })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email Address *",
							error: errors.email?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								...register("email")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone Number *",
							error: errors.phone?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "tel",
								...register("phone")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nationality",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("nationality") })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Country of Residence",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("country_residence") })
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 font-display text-lg font-bold text-forest",
					children: "Travel Details"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Number of Adults *",
							error: errors.adults?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 1,
								...register("adults")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Number of Children (under 12)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								...register("children")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Children's Ages",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "e.g. 6, 9",
								...register("children_ages")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Preferred Travel Dates *",
							error: errors.travel_dates?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "e.g. July 12–20, 2026",
								...register("travel_dates")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Destination(s) *",
							error: errors.destinations?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: (v) => setValue("destinations", v, { shouldValidate: true }),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Volcanoes NP",
										children: "Volcanoes NP"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Nyungwe NP",
										children: "Nyungwe NP"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Akagera NP",
										children: "Akagera NP"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "All Three Parks",
										children: "All Three Parks"
									})
								] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Trip Duration (Days)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 1,
								...register("duration")
							})
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 font-display text-lg font-bold text-forest",
					children: "Budget & Preferences"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Budget Range per person",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: (v) => setValue("budget", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "$5,000-$10,000",
										children: "$5,000 – $10,000"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "$10,000-$20,000",
										children: "$10,000 – $20,000"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "$20,000-$50,000",
										children: "$20,000 – $50,000"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "$50,000+",
										children: "$50,000+"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Flexible",
										children: "Flexible"
									})
								] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Accommodation Type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: (v) => setValue("accommodation", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Ultra-Luxury",
										children: "Ultra-Luxury"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Luxury",
										children: "Luxury"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Mid-Range",
										children: "Mid-Range"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Budget",
										children: "Budget"
									})
								] })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Travel Style",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								onValueChange: (v) => setValue("travel_style", v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Private Guided",
										children: "Private Guided"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Small Group",
										children: "Small Group"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Family-Friendly",
										children: "Family-Friendly"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "Honeymoon/Romantic",
										children: "Honeymoon / Romantic"
									})
								] })]
							})
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-4 font-display text-lg font-bold text-forest",
						children: "Special Requirements"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Dietary Restrictions",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("dietary") })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Mobility Concerns",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...register("mobility") })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Special Occasion",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									onValueChange: (v) => setValue("occasion", v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "None",
											children: "None"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "Honeymoon",
											children: "Honeymoon"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "Anniversary",
											children: "Anniversary"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "Birthday",
											children: "Birthday"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "Family Reunion",
											children: "Family Reunion"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "Corporate Retreat",
											children: "Corporate Retreat"
										})
									] })]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Additional Notes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 4,
							className: "mt-1.5",
							...register("notes"),
							placeholder: "Dream itinerary, must-see wildlife, accessibility, celebrations…"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-4 font-display text-lg font-bold text-forest",
					children: "Referral & Contact"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "How did you hear about us?",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							onValueChange: (v) => setValue("referral", v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Google",
									children: "Google"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Instagram",
									children: "Instagram"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Facebook",
									children: "Facebook"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Travel Agent",
									children: "Travel Agent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Friend/Family",
									children: "Friend / Family"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Other",
									children: "Other"
								})
							] })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Preferred Contact Method",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							onValueChange: (v) => setValue("contact_method", v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "WhatsApp",
									children: "WhatsApp"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Email",
									children: "Email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "Phone Call",
									children: "Phone Call"
								})
							] })]
						})
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					size: "lg",
					disabled: isSubmitting,
					className: "w-full bg-[#25D366] text-white hover:brightness-95 md:w-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "mr-2 h-4 w-4" }),
						isSubmitting ? "Preparing…" : "Send via WhatsApp",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "ml-2 h-4 w-4" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Tapping the button opens WhatsApp with your details pre-filled. Simply press send to complete your inquiry."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-border bg-card p-6 shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mb-4 font-display text-lg font-bold text-forest",
						children: "Get in touch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+250791900016",
									className: "hover:text-forest",
									children: "+250 791 900 016"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:info@edgelinktours.com",
									className: "hover:text-forest",
									children: "info@edgelinktours.com"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }), "KG 7 Ave, Kigali, Rwanda"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mt-0.5 h-4 w-4 shrink-0 text-gold" }), "Mon–Sat · 08:00–19:00 CAT"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://wa.me/250791900016",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Chat on WhatsApp"]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-2xl border border-border bg-card shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "EDGELINK office location, Kigali",
					src: "https://www.google.com/maps?q=Kigali+Rwanda&output=embed",
					className: "h-64 w-full border-0",
					loading: "lazy"
				})
			})]
		})]
	})] });
}
function Field({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1.5",
			children
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-destructive",
			children: error
		})
	] });
}
//#endregion
export { Contact as component };
