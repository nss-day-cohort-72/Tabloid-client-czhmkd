import React, { useEffect, useState } from "react";
import { getAllTags } from "../../managers/tagManager";
import {
  Button,
  Container,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { CreateTag } from "./CreateTag";

export const TagsList = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getAllTags();
        setTags(data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleTagCreated = (newTag) => {
    setTags((prevTags) =>
      [...prevTags, newTag].sort((a, b) => a.name.localeCompare(b.name))
    );
  };

  if (loading) {
    return (
      <Container className="mt-5">
        <p>Loading tags...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <CardTitle tag="h1">Tags</CardTitle>
            <Button color="primary" onClick={toggleModal}>
              Add Tag
            </Button>
          </div>
          <ListGroup>
            {tags.map((tag) => (
              <ListGroupItem key={tag.id} className="text-capitalize">
                {tag.name}
              </ListGroupItem>
            ))}
          </ListGroup>
        </CardBody>
      </Card>
      <CreateTag
        isOpen={modalOpen}
        toggle={toggleModal}
        onTagCreated={handleTagCreated}
      />
    </Container>
  );
};
