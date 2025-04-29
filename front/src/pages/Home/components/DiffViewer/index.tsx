import { useCallback } from 'react';
import DOMPurify from 'dompurify';
import {
  Container,
  AddedText,
  Column,
  RemovedText,
  TextBlock,
  Title,
} from './styles';
import { TextDiffViewerProps } from '../../types';

export const DiffViewer = ({ diffResult }: TextDiffViewerProps) => {
  const renderChanges = useCallback(
    (isOldVersion: boolean) => {
      return diffResult.changes.map((change, index) => {
        const { value, added, removed } = change;

        const safeHtml = { __html: DOMPurify.sanitize(value) };

        if (isOldVersion) {
          if (added) return null;
          if (removed) {
            return (
              <RemovedText key={index} dangerouslySetInnerHTML={safeHtml} />
            );
          }
          return <span key={index} dangerouslySetInnerHTML={safeHtml} />;
        } else {
          if (removed) return null;
          if (added) {
            return <AddedText key={index} dangerouslySetInnerHTML={safeHtml} />;
          }
          return <span key={index} dangerouslySetInnerHTML={safeHtml} />;
        }
      });
    },
    [diffResult.changes]
  );

  return (
    <Container>
      <Column>
        <Title>Previous Document</Title>
        <TextBlock>{renderChanges(true)}</TextBlock>
      </Column>
      <Column>
        <Title>Latest Document</Title>
        <TextBlock>{renderChanges(false)}</TextBlock>
      </Column>
    </Container>
  );
};
