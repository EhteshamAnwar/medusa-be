import React, { useState } from "react";
import { RouteConfig } from "@medusajs/admin";
import { ShoppingBag } from "@medusajs/icons";
import { Table, Button, Input } from "@medusajs/ui";
import axios from "axios";
import { useAdminCustomQuery, useAdminCustomPost,useAdminCustomDelete } from "medusa-react";
import { FAQ as FAQModel } from "../../../models/faq.entity";

type RequestQuery = {
  limit?: number;
  offset?: number;
};

type ResponseData = {
  faqs: FAQModel[];
  total: number;
  limit: number;
  offset: number;
};

const FAQManagement = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { mutate: createFAQ, isLoading:isFAQLoading } = useAdminCustomPost( "/admin/faqs",["create_faq"]);
  const { mutate: updateFAQ } = useAdminCustomPost(`/admin/faqs/${editingId}`, ["update_faq"]);
  const deleteFAQ = useAdminCustomDelete(`/admin/faqs/${deletingId}`, ["delete_faq"]);
  const { data, isLoading, refetch } = useAdminCustomQuery<RequestQuery, ResponseData>(
    "/admin/faqs", // Adjust the API endpoint if necessary
    ["faqs"]
  );

  const handleCreateOrUpdateFAQ = async () => {
    if (editingId) {
      // await axios.post(`/admin/faqs/${editingId}`, { question, answer, tags });
      console.log('Updating faq')
      updateFAQ({ question, answer, tags }, {
        onSuccess: () => {
          console.log("FAQ updated successfully");
          setQuestion("");
          setAnswer("");
          setTags([]);
        },
        onError: (error) => {
          console.error("Error updating FAQ:", error);
        },
      });
    } else {
      createFAQ({ question, answer, tags }, {
        onSuccess: () => {
          console.log("FAQ created successfully");
          setQuestion("");
          setAnswer("");
          setTags([]);
        },
        onError: (error) => {
          console.error("Error creating FAQ:", error);
        },
      });
    }
    refetch();
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setTags([]);
  };

  const startEditing = (faq: FAQModel) => {
    setEditingId(faq.id);
    setQuestion(faq.question);
    setAnswer(faq.answer);
    setTags(faq.tags.map((tag) => tag.name));
  };

  const handleDeleteFAQ = async () => {
    if(deletingId &&  deletingId !== '')
    {
      console.log('deleting faq', deletingId)
      deleteFAQ.mutate(void 0, {
        onSuccess: () => {
          console.log('delete successfull');
          setDeletingId('');
        }
      })

    }
    refetch();
    setEditingId(null);
    setQuestion("");
    setAnswer("");
    setTags([]);
  };
  const startDeleting = (faq: FAQModel) => {
    setDeletingId(faq.id);
    handleDeleteFAQ();
  };
  let faqs = data? data.faqs : [];
  console.log(faqs);
  return (
    <div>
      <h1>FAQ Management {!isLoading && faqs.length}</h1>
      <div style={{
              paddingBottom: '20px', 
              display: 'flex', 
              minHeight: '200px', 
              justifyContent: 'space-between', 
              flexDirection: 'column'  }}  >
        <Input   placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} />
        <Input   placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} />
        <Input
           
          placeholder="Tags (comma separated)"
          value={tags.join(",")}
          onChange={(e) => setTags(e.target.value.split(","))}
        />
        <Button onClick={handleCreateOrUpdateFAQ}>{editingId ? "Update FAQ" : "Create FAQ"}</Button>
      </div>

      {isLoading && <span>Loading...</span>}

      {!isLoading && faqs.length === 0 && <span>No FAQs available</span>}
      {!isLoading && faqs.length > 0 && (
        <Table>
          <Table.Header>
            <Table.Row> 
              <Table.HeaderCell>Question</Table.HeaderCell>
              <Table.HeaderCell>Answer</Table.HeaderCell>
              <Table.HeaderCell>Tags</Table.HeaderCell>
              <Table.HeaderCell>Created At</Table.HeaderCell>
              <Table.HeaderCell>Updated At</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row> 
          </Table.Header>
          <Table.Body>
            {faqs.map((faq) => (
              <Table.Row key={faq.id}>
                <Table.Cell>{faq.question || '--'}</Table.Cell>
                <Table.Cell>{faq.answer || '--'}</Table.Cell>
                <Table.Cell>{faq.tags.map((tag) => tag.name).join(", ") || '--'}</Table.Cell>
                <Table.Cell>{new Date(faq.created_at).toLocaleString() || '--'}</Table.Cell>
                <Table.Cell>{new Date(faq.updated_at).toLocaleString() || '--'}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => startEditing(faq)} style={{margin:'5px'}}>Edit</Button>
                  <Button variant="danger" onClick={() => startDeleting(faq)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </div>
  );
};

export const config: RouteConfig = {
  link: {
    label: "FAQs",
    icon: ShoppingBag,
  },
};

export default FAQManagement;
