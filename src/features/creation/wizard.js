/** Ordered step metadata only; no wizard transitions are implemented. */
export const CREATION_STEPS = [
  {
    "order": 1,
    "name": "Enter prediction question",
    "component": "EnterPredictionQuestionStep",
    "priority": "P1"
  },
  {
    "order": 2,
    "name": "Generate AI draft",
    "component": "GenerateAiDraftStep",
    "priority": "P1"
  },
  {
    "order": 3,
    "name": "Edit title and description",
    "component": "EditTitleAndDescriptionStep",
    "priority": "P1"
  },
  {
    "order": 4,
    "name": "Review YES/NO outcomes",
    "component": "ReviewYesNoOutcomesStep",
    "priority": "P1"
  },
  {
    "order": 5,
    "name": "Choose category and room",
    "component": "ChooseCategoryAndRoomStep",
    "priority": "P1"
  },
  {
    "order": 6,
    "name": "Define closing deadline and timezone",
    "component": "DefineClosingDeadlineAndTimezoneStep",
    "priority": "P1"
  },
  {
    "order": 7,
    "name": "Define resolution source and observation rules",
    "component": "DefineResolutionSourceAndObservationRulesStep",
    "priority": "P1"
  },
  {
    "order": 8,
    "name": "Review ambiguity and duplicate warnings",
    "component": "ReviewAmbiguityAndDuplicateWarningsStep",
    "priority": "P1"
  },
  {
    "order": 9,
    "name": "Preview market",
    "component": "PreviewMarketStep",
    "priority": "P1"
  },
  {
    "order": 10,
    "name": "Request creation fee quote",
    "component": "RequestCreationFeeQuoteStep",
    "priority": "P1"
  },
  {
    "order": 11,
    "name": "Review fees and transaction",
    "component": "ReviewFeesAndTransactionStep",
    "priority": "P1"
  },
  {
    "order": 12,
    "name": "Approve wallet transaction",
    "component": "ApproveWalletTransactionStep",
    "priority": "P1"
  },
  {
    "order": 13,
    "name": "Pending confirmation",
    "component": "PendingConfirmationStep",
    "priority": "P1"
  },
  {
    "order": 14,
    "name": "Creation confirmed",
    "component": "CreationConfirmedStep",
    "priority": "P1"
  },
  {
    "order": 15,
    "name": "Open created market",
    "component": "OpenCreatedMarketStep",
    "priority": "P1"
  }
]
