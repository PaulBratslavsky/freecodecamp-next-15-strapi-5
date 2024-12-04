"use client";
import { useActionState } from "react";
import { blockRenderer } from "@/utils/block-renderer";
import { Block } from "@/types";
import { SubmitButton } from "./SubmitButton";
import { eventsSubscribeAction } from "@/data/actions";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  errorMessage: null,
  successMessage: null,
  formData: null,
};

interface TextInputProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  error?: string;
  defaultValue?: string;
}

function TextInput({ id, label, name, type = "text", error, defaultValue }: TextInputProps) {
  return (
    <div className="input__container">
      <label htmlFor={id} className="copy">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="input input__text input--beige"
        defaultValue={defaultValue}
      />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
}

export default function EventSignupForm({
  blocks,
  eventId,
}: {
  blocks: Block[];
  eventId: string;
}) {
  const [formState, formAction] = useActionState(
    eventsSubscribeAction,
    INITIAL_STATE
  );

  const zodErrors = formState?.zodErrors;
  const strapiErrors = formState?.strapiErrors?.message;
  const successMessage = formState?.successMessage;

  return (
    <section className="signup-form">
      <div className="signup-form__info">
        <div>{blocks.map(blockRenderer)}</div>
      </div>
      <form className="signup-form__form" action={formAction}>
        <div className="signup-form__name-container">
          <TextInput
            id="firstName"
            label="First Name"
            name="firstName"
            error={zodErrors?.firstName}
            defaultValue={formState?.formData?.firstName ?? ""}
          />
          <TextInput
            id="lastName"
            label="Last Name"
            name="lastName"
            error={zodErrors?.lastName}
            defaultValue={formState?.formData?.lastName ?? ""}
          />
        </div>
        <TextInput
          id="email"
          label="Email"
          name="email"
          type="email"
          error={zodErrors?.email}
          defaultValue={formState?.formData?.email ?? ""}
        />
        <TextInput
          id="phone"
          label="Phone"
          name="telephone"
          type="text"
          error={zodErrors?.telephone}
          defaultValue={formState?.formData?.telephone ?? ""}
        />
        <input hidden type="text" name="eventId" defaultValue={eventId} />
        <SubmitButton
          text="Sign Up"
          className="btn btn--medium btn--turquoise"
        />
        {strapiErrors && <p className="signup-form__error">{strapiErrors}</p>}
        {successMessage && (
          <p className="signup-form__success">{successMessage}</p>
        )}
      </form>
    </section>
  );
}
