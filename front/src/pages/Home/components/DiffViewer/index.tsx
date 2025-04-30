import React, { useMemo } from 'react';
import DOMPurify from 'dompurify';
import { Container, Column, TextBlock, Title } from './styles';
import { TextDiffViewerProps } from '../../types';

export const DiffViewer = React.memo(({ diffResult }: TextDiffViewerProps) => {
  const memoLatest = useMemo(
    () => ({ __html: DOMPurify.sanitize(diffResult.latestDocument) }),
    [diffResult.latestDocument]
  );
  const memoPrevious = useMemo(
    () => ({ __html: DOMPurify.sanitize(diffResult.previousDocument) }),
    [diffResult.previousDocument]
  );

  return (
    <Container>
      <Column>
        <Title>Previous Document</Title>
        <TextBlock>
          <div key="latestDocument" dangerouslySetInnerHTML={memoPrevious} />
        </TextBlock>
      </Column>
      <Column>
        <Title>Latest Document</Title>
        <TextBlock>
          <div key="previousDocument" dangerouslySetInnerHTML={memoLatest} />
        </TextBlock>
      </Column>
    </Container>
  );
});
