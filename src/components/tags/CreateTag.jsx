import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { createTag } from "../../managers/tagManager";

export const CreateTag = ({ isOpen, toggle, onTagCreated }) => {
  const [tagName, setTagName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) {
      alert("Tag name cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newTag = await createTag({ name: tagName.trim() });
      onTagCreated(newTag); // Callback to update the list
      setTagName(""); // Clear input
      toggle(); // Close modal
    } catch (error) {
      console.error("Error creating tag:", error);
      alert("Failed to create tag.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New Tag</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="tagName">Tag Name</Label>
            <Input
              id="tagName"
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="Enter tag name"
              disabled={isSubmitting}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Tag"}
          </Button>
          <Button color="secondary" onClick={toggle} disabled={isSubmitting}>
            Cancel
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};
