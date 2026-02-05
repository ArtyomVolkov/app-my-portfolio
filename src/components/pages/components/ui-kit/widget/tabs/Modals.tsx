import React, { useState } from "react";

import Button from "@shared/components/ui-kit/button";
import Divider from "@shared/components/ui-kit/divider";
import Section from "@shared/components/section";
import Typography from "@shared/components/ui-kit/typography";
import modal from "@shared/components/ui-kit/modal";

import styles from "./style.module.scss";

const CustomModal = ({ onClose }) => {
  return (
    <div className={styles.modalContent}>
      <Typography variant="h6">This is a custom modal content.</Typography>
      <div className={styles.modalActions}>
        <Button variant="outlined" color="default" onClick={onClose}>
          Close
        </Button>
        <Button variant="solid" color="primary">
          Action
        </Button>
      </div>
    </div>
  );
};

const ConfirmModal = ({ onConfirm, onClose }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.modalContent}>
      <Typography variant="h4" className={styles.subtitle}>
        Are you sure you want to proceed with this action?
      </Typography>
      <div className={styles.modalActions}>
        <Button variant="outlined" color="default" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="solid"
          color="primary"
          loading={loading}
          onClick={async () => {
            setLoading(true);
            await onConfirm();
            setLoading(false);
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

const DeleteModal = ({ onDelete, onClose }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={styles.modalContent}>
      <Typography variant="h4" className={styles.subtitle}>
        Are you sure you want to delete this item? This action cannot be undone.
      </Typography>
      <div className={styles.modalActions}>
        <Button variant="outlined" color="default" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="solid"
          color="danger"
          loading={loading}
          onClick={async () => {
            setLoading(true);
            await onDelete();
            setLoading(false);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

const MovableModal = ({ onClose }) => {
  return (
    <div className={styles.modalContent}>
      <div>
        <Typography variant="h4">This is a movable modal content.</Typography>
        <Typography variant="p">Modal box can be movable.</Typography>
      </div>
      <div className={styles.modalActions}>
        <Button variant="outlined" color="default" onClick={onClose}>
          Close
        </Button>
        <Button variant="solid" color="primary" onClick={onClose}>
          Ok
        </Button>
      </div>
    </div>
  );
};

const StackedModal = ({ onClose, onNewModal }) => {
  return (
    <div className={styles.modalContent}>
      <div>
        <Typography variant="h4">This is a stacked modal content.</Typography>
        <Typography variant="p">Modal box can be movable.</Typography>
      </div>
      <div className={styles.modalActions}>
        <Button variant="outlined" color="default" onClick={onClose}>
          Close
        </Button>
        <Button variant="solid" color="primary" onClick={onNewModal}>
          New Modal
        </Button>
      </div>
    </div>
  );
};

const ModalsTab = () => {
  const onAction = async (callback: Function) => {
    return new Promise((res) => setTimeout(() => res(callback()), 2000));
  };

  const openDefaultModal = () => {
    modal.open("defaultModal", {
      onClose: () => modal.close("defaultModal"),
    });
  };

  const openModalWithTitle = () => {
    modal.open("modalWithTitle", {
      header: <span>Modal Title</span>,
      body: <div>This is a content of modal.</div>,
      onClose: () => modal.close("modalWithTitle"),
    });
  };

  const openCustomModal = () => {
    modal.open("customModal", {
      header: "Custom Modal Title",
      body: <CustomModal onClose={() => modal.close("customModal")} />,
      onClose: () => modal.close("customModal"),
    });
  };

  const openConfirmModal = () => {
    modal.open("confirmModal", {
      header: "Confirm Action",
      backDropClose: false,
      body: (
        <ConfirmModal
          onConfirm={() => onAction(() => modal.close("confirmModal"))}
          onClose={() => modal.close("confirmModal")}
        />
      ),
      onClose: () => modal.close("confirmModal"),
    });
  };

  const openInfoModal = () => {
    modal.open("infoModal", {
      header: "Information",
      body: (
        <div className={styles.modalContent}>
          <Typography variant="p">
            This is some important information for the user.
          </Typography>
          <div className={styles.modalActions}>
            <Button
              variant="solid"
              color="primary"
              onClick={() => modal.close("infoModal")}
            >
              Got It
            </Button>
          </div>
        </div>
      ),
      onClose: () => modal.close("infoModal"),
    });
  };

  const openDeleteModal = () => {
    modal.open("deleteModal", {
      header: "Delete Item",
      backDropClose: false,
      body: (
        <DeleteModal
          onDelete={() => onAction(() => modal.close("deleteModal"))}
          onClose={() => modal.close("deleteModal")}
        />
      ),
      onClose: () => modal.close("deleteModal"),
    });
  };

  const openMovableModal = () => {
    modal.open("movableModal", {
      header: "Movable Modal",
      backDropClose: false,
      body: <MovableModal onClose={() => modal.close("movableModal")} />,
      movable: true,
      onClose: () => modal.close("movableModal"),
    });
  };

  const openStackModal = () => {
    const id = Math.random() * 10000;
    const name = `stackedModal_${id}`;

    modal.open(name, {
      header: `Stacked Modal ${id.toFixed(0)}`,
      backDropClose: false,
      movable: true,
      body: (
        <StackedModal
          onClose={() => modal.close(name)}
          onNewModal={openStackModal}
        />
      ),
      onClose: () => modal.close(name),
    });
  };

  return (
    <div className={styles.TabContent}>
      <h2 className={styles.title}>Modal Window</h2>
      <p className={styles.subtitle}>
        A modal is a dialog box/popup window that is displayed on top of the
        current page.
      </p>
      <div className={styles.examples}>
        <Section title="Modals Variants">
          <article className={styles.article}>
            <Button variant="outlined" onClick={openDefaultModal}>
              Open Default Modal
            </Button>
            <Divider title="Title and Content | Custom" align="left" />
            <div className={styles.row}>
              <Button
                variant="outlined"
                color="primary"
                onClick={openModalWithTitle}
              >
                Open Modal
              </Button>
              <Button
                variant="dashed"
                color="primary"
                onClick={openCustomModal}
              >
                Open Custom Modal
              </Button>
            </div>
            <Divider title="Confirm | Info | Delete" align="left" />
            <div className={styles.row}>
              <Button
                variant="solid"
                color="warning"
                onClick={openConfirmModal}
              >
                Open Confirm Modal
              </Button>
              <Button variant="solid" color="info" onClick={openInfoModal}>
                Open Info Modal
              </Button>
              <Button variant="solid" color="danger" onClick={openDeleteModal}>
                Open Delete Modal
              </Button>
            </div>
            <Divider title="Movable" align="left" />
            <Button variant="solid" color="primary" onClick={openMovableModal}>
              Open Movable Modal
            </Button>
            <Divider title="Modal Stack" align="left" />
            <Button variant="dashed" color="primary" onClick={openStackModal}>
              Open Stack Modal
            </Button>
          </article>
        </Section>
      </div>
    </div>
  );
};

export default ModalsTab;
