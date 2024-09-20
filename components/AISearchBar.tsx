import { Button, Label, TextInput } from "flowbite-react";

export function AISearchBar() {
    return (
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="searchQuery" value="Search Query" />
          </div>
          <TextInput id="searchQuery" type="email" placeholder="What goods are you looking for?" required />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    );
  }