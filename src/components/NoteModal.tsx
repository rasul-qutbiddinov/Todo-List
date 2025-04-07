import { useEffect, useState } from "react";
import { INoteTypes } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    completed?: boolean;
  }) => void;
  defaultValues?: INoteTypes | null;
}

const NoteModal = ({ isOpen, onClose, onSubmit, defaultValues }: Props) => {
  const { t } = useTranslation(); // ✅ Tarjima hook
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (defaultValues && isOpen) {
      setTitle(defaultValues.title);
      setDescription(defaultValues.description);
      setCompleted(defaultValues.completed);
    } else if (isOpen) {
      setTitle("");
      setDescription("");
      setCompleted(false);
    }
  }, [defaultValues, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="mb-4 text-lg font-semibold dark:text-white">
              {defaultValues ? t("editNote") : t("addNote")}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder={t("titlePlaceholder")}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white"
              />

              <textarea
                placeholder={t("descriptionPlaceholder")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-gray-700 dark:text-white"
              />

              {defaultValues && (
                <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-white">
                  <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="form-checkbox accent-indigo-500"
                  />
                  <span>{t("completed")}</span>
                </label>
              )}

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={onClose}
                  className="rounded bg-gray-300 px-4 py-1 text-sm dark:bg-gray-600 dark:text-white"
                >
                  {t("cancel")}
                </button>
                <button
                  disabled={!title || !description}
                  onClick={() =>
                    onSubmit({
                      title,
                      description,
                      completed,
                    })
                  }
                  className="rounded bg-indigo-600 px-4 py-1 text-sm text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t("apply")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoteModal;
