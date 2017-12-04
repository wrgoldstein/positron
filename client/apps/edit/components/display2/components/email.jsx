import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Col, Row } from 'react-styled-flexboxgrid'
import { CharacterLimit } from 'client/components/character_limit'
import ImageUpload from 'client/apps/edit/components/admin/components/image_upload.coffee'

export class DisplayEmail extends Component {
  static propTypes = {
    article: PropTypes.object,
    onChange: PropTypes.func
  }

  onChange = (key, value) => {
    console.log('key', key, 'value', value)
  }

  render () {
    const { article, onChange } = this.props
    const {
      author,
      credit_line,
      credit_url,
      custom_text,
      headline,
      image_url
    } = article.get('email_metadata')

    return (
      <Row className='DisplayEmail'>
        <Col xs={4}>
          <div className='field-group'>
            <label>Email Image</label>
            <ImageUpload
              name='social_image'
              src={image_url || ''}
              onChange={this.onChange}
            />
          </div>
          <div className='field-group'>
            <CharacterLimit
              label='Email Headline'
              limit={97}
              type='textarea'
              onChange={(value) => this.onChange('headline', value)}
              defaultValue={headline}
            />
          </div>
          <div className='field-group'>
            <CharacterLimit
              label='Custom Text'
              limit={160}
              type='textarea'
              onChange={(value) => this.onChange('custom_text', value)}
              defaultValue={custom_text}
            />
          </div>
          <div className='field-group'>
            <label>Author</label>
            <input
              onChange={(e) => this.onChange('author', e.target.value)}
              defaultValue={author}
              className='bordered-input'
            />
          </div>

        </Col>
        <Col xs={8}>
          <div>preview goes here</div>
          <div className='field-group--inline'>
            <div className='field-group'>
              <label>Credit Line</label>
              <input
                onChange={(e) => this.onChange('credit_line', e.target.value)}
                defaultValue={credit_line}
                className='bordered-input'
              />
            </div>
            <div className='field-group'>
              <label>Credit Url</label>
              <input
                onChange={(e) => this.onChange('credit_url', e.target.value)}
                defaultValue={credit_url}
                className='bordered-input'
              />
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <div
            className='field-group flat-checkbox'
            onClick={() => onChange('send_body', !article.get('send_body'))}>
            <input
              readOnly
              type='checkbox'
              checked={article.get('send_body')}
            />
            <label>Send Article Body To Sailthru</label>
          </div>
        </Col>
      </Row>
    )
  }
}
